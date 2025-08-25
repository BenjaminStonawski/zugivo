export class SoundManager {
  constructor({ concurrency = 12, masterVolume = 1 } = {}) {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.buffers = new Map();
    this.active = new Set();
    this.concurrency = concurrency;

    this.master = this.ctx.createGain();
    this.master.gain.value = masterVolume;
    const comp = this.ctx.createDynamicsCompressor();
    this.master.connect(comp).connect(this.ctx.destination);

    // iOS “unlock”
    const unlock = async () => {
      try {
        await this.ctx.resume();
        const b = this.ctx.createBuffer(1, 1, 22050);
        const s = this.ctx.createBufferSource();
        s.buffer = b; s.connect(this.ctx.destination); s.start(0);
      } catch {}
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('mousedown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('mousedown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') this.ctx.suspend();
      else this.ctx.resume();
    });
  }

  async load(name, url) {
    const res = await fetch(url);
    const arr = await res.arrayBuffer();
    const buf = await this.ctx.decodeAudioData(arr);
    this.buffers.set(name, buf);
  }

  async loadAll(map) {
    await Promise.all(Object.entries(map).map(([n, u]) => this.load(n, u)));
  }

  play(name, { volume = 1, rate = 1, loop = false } = {}) {
    const buffer = this.buffers.get(name);
    if (!buffer) return;

    if (this.active.size >= this.concurrency) {
      const oldest = this.active.values().next().value;
      try { oldest.stop(); } catch {}
    }

    const gain = this.ctx.createGain();
    gain.gain.value = volume;

    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = rate;
    src.loop = loop;

    src.connect(gain).connect(this.master);
    src.start();

    src.addEventListener('ended', () => {
      this.active.delete(src);
      gain.disconnect();
    });
    this.active.add(src);
    return src;
  }

  stopAll() {
    for (const s of this.active) { try { s.stop(); } catch {} }
    this.active.clear();
  }

  setMasterVolume(v) { this.master.gain.value = v; }
}