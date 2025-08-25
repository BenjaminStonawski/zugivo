import { SoundManager } from './sound-manager.js';
import { zugTexts } from './texts.js';

const main = document.getElementById("main");
let vege = false;

for (let i = 0; i < 5; i++) {
    const col = document.createElement("div");
    main.appendChild(col);
}

const columns = document.getElementById("main").children;

for (let i = 0; i < columns.length; i++) {
    for (let j = 0; j < 5; j++) {
        var mine = document.createElement("a");
        mine.classList.add("btn", "btn-primary", "mine");
        columns[i].append(mine);
    }
}

const sounds = new SoundManager();
(async () => {
  await sounds.loadAll({
    wrongMine: 'sounds/wm.mp3',
    loseAudio: 'sounds/lose.mp3',
    btnAudio: 'sounds/button.mp3',
    angel: 'sounds/angel.mp3',
    pop: 'sounds/pop1.mp3',
    buzz: 'sounds/buzz.mp3',
  });
})();

let infoShow = false;
let settingsShow = false;

let selDiff = 0;
document.getElementById("difficulty").innerHTML = "Könnyű";
document.getElementById("diffNum").innerHTML = "(1:25)";
document.getElementById("diffMeter").style.color = "#3cff00ff";

function extremPlus() {
    document.getElementById("difficulty").innerHTML = "Hát te hülye vagy...";
    document.getElementById("diffNum").innerHTML = "(24:25)";
    document.getElementById("difficulty").style.color = "gray";
    document.getElementById("diffMeter").style.color = "red";
    selDiff = 23;
    sorsolas();
}

function diffChange() {
    if (selDiff == 0) {
        document.getElementById("difficulty").innerHTML = "Könnyű";
        document.getElementById("diffNum").innerHTML = "(1:25)";
        document.getElementById("difficulty").style.color = "white";
        document.getElementById("diffMeter").style.color = "#3cff00ff";
    }
    else if (selDiff == 1) {
        document.getElementById("difficulty").innerHTML = "Közepes";
        document.getElementById("diffNum").innerHTML = "(2:25)";
        document.getElementById("difficulty").style.color = "white";
        document.getElementById("diffMeter").style.color = "yellow";
    }
    else if (selDiff == 2) {
        document.getElementById("difficulty").innerHTML = "Nehéz";
        document.getElementById("diffNum").innerHTML = "(3:25)";
        document.getElementById("difficulty").style.color = "white";
        document.getElementById("diffMeter").style.color = "red";
    }
    else if (selDiff == 3) {
        document.getElementById("difficulty").innerHTML = "EXTRÉM";
        document.getElementById("diffNum").innerHTML = "(4:25)";
        document.getElementById("difficulty").style.color = "red";
        document.getElementById("diffMeter").style.color = "red";
    }
    sorsolas();
}

let badCells = [];

function sorsolas() {
    badCells = [];
    let needed = selDiff + 1;

    for (let i = 0; i < columns.length; i++) {
        const fSelRow = columns[i].children;
        for (let j = 0; j < fSelRow.length; j++) {
            fSelRow[j].classList.value = "";
            fSelRow[j].classList.add("btn", "btn-primary", "mine");
        }
    }

    while (badCells.length < needed) {
        let randCol = Math.floor(Math.random() * 5);
        let selCol = columns[randCol];
        let rows = selCol.children;
        let randRow = Math.floor(Math.random() * 5);
        let selRow = rows[randRow];

        if (!badCells.includes(selRow)) {
            badCells.push(selRow);
        }
    }
}

let playerNum = 0;
let playerList = [];
let playerDrinks = [];
let selPlayer = 0;

function jatekosMegadas() {
    document.getElementById("dialog").style.display = "block";
    document.getElementById("window-title").innerHTML = "Hányan játszanak?"

    document.getElementById("window-btn").onclick = function() {
        sounds.play('btnAudio');
        if (Number.isInteger(parseInt(document.getElementById("window-input").value)) && (parseInt(document.getElementById("window-input").value)) >= 2 && (parseInt(document.getElementById("window-input").value)) <= 25) {
            playerNum = parseInt(document.getElementById("window-input").value);
            if (playerNum >= 11) {
                document.getElementById("window-elements").style.overflowY = "auto";
                document.getElementById("window-elements").style.height = "800px";
            }
            document.getElementById("window-title").innerHTML = "Add meg a játékosneveket:";
            document.getElementById("window-input").style.display = "none";
            document.getElementById("w-b-outer").style.display = "none";

            const div = document.createElement("div");
            div.id = "players";

            for (let i = 0; i < playerNum; i++) {
                const label = document.createElement("label");
                label.innerHTML = "#" + parseInt(i+1) + ":"
                const input = document.createElement("input");
                const br = document.createElement("br");

                label.style.padding = "10px";
                div.style.padding = "10px";

                div.appendChild(label);
                div.appendChild(input);
                div.appendChild(br);
                document.getElementById("window-elements").appendChild(div);
                playerDrinks.push(0);
            }

            const btnDiv = document.createElement("div");
            const btn = document.createElement("a");

            btnDiv.classList.add("p-25");
            btnDiv.id = "plNext";
            btn.classList.add("btn", "btn-secondary");
            btn.innerHTML = "Tovább";
            btnDiv.appendChild(btn);

            document.getElementById("window-elements").appendChild(btnDiv);

            btn.onclick = function() {
                sounds.play('btnAudio');
                let helyesMegadas = true;
                const playerInputs = document.getElementById("players").querySelectorAll("input");
                playerInputs.forEach(input => {
                    if (input.value == "") {
                        helyesMegadas = false;
                    }
                });
                if (!helyesMegadas) {
                    alert("HIBA: Nem megfelelő játékosnév");
                }
                else {
                    const playerInputs = document.getElementById("players").querySelectorAll("input");
                    playerInputs.forEach(input => {
                        playerList.push(input.value);
                    });

                    document.getElementById("dialog").classList.remove("fade-in");
                    document.getElementById("dialog").classList.add("fade-out");

                    setTimeout(() => {
                        document.getElementById("dialog").style.display = "none";
                        document.getElementById("dialog").classList.remove("fade-out");
                    }, 300);;
                    document.getElementById("playerName").innerHTML = playerList[0];
                    for (let i = 0; i < playerList.length; i++) {
                        document.getElementById("jatekosok").innerHTML += playerList[i] + ": " + playerDrinks[i] + "<br>";
                    }
                    
                    document.getElementById("players").style.display = "none";
                    document.getElementById("plNext").style.display = "none";

                    document.getElementById("settingsBtn").style.display = "flex";
                    document.getElementById("iv").style.display = "block";
                }
            }
        }
        else {
            alert("HIBA: Csak 2 és 25 közötti szám adható meg!");
        }
    };
}

for (let i = 0; i < columns.length; i++) {
    const fSelRow = columns[i].children;
    for (let j = 0; j < fSelRow.length; j++) {
        fSelRow[j].onclick = function() {
            deterMine(this);
        };
    }
}

function zugButton() {
    const btnDiv = document.createElement("div");
    const btn = document.createElement("a");

    btnDiv.classList.add("p-25");
    btnDiv.id = "zugButton";
    btn.classList.add("btn", "btn-secondary");
    btn.innerHTML = zugTexts[Math.floor(Math.random() * zugTexts.length)];
    btn.style.fontSize = "20px";
    btnDiv.appendChild(btn);

    document.getElementById("window-elements").appendChild(btnDiv);

    btn.onclick = function () {
        sounds.play('btnAudio');
        document.getElementById("dialog").classList.remove("fade-in");
        document.getElementById("dialog").classList.add("fade-out");

        setTimeout(() => {
            document.getElementById("dialog").style.display = "none";
            document.getElementById("dialog").classList.remove("fade-out");
        }, 300);;
    }

    document.getElementById("zugButton").style.display = "none";
}

window.onload = function() {
    sorsolas();
    zugButton();
    jatekosMegadas();
};

function deterMine(sel) {
    if (!vege) {
        if (badCells.includes(sel)) {
            sounds.play('wrongMine');

            for (let i = 0; i < columns.length; i++) {
                const fSelRow = columns[i].children;
                for (let j = 0; j < fSelRow.length; j++) {
                    fSelRow[j].classList.remove("btn-primary");
                    fSelRow[j].classList.add("btn-secondary");
                }
            }

            badCells.forEach(cell => {
                cell.classList.remove("btn-secondary");
                cell.classList.add("btn-danger");
            });

            setTimeout(() => {
                    sounds.play('loseAudio');
                    document.getElementById("dialog").classList.add("fade-in");
                    document.getElementById("dialog").style.display = "block";
                    document.getElementById("window-title").innerHTML = "<b>" + playerList[selPlayer] + "</b>" + ", te vagy a <b>zugivó!</b>";
                    document.getElementById("window-elements").style.height = "auto";
                    
                    document.getElementById("zugButton").style.display = "block";
                }, 1000);;

            playerDrinks[selPlayer]++;
            vege = true;
            document.getElementById("ujrakezd").style.display = "block";
        }
        else if (sel.classList.contains("btn-success")) {
            sounds.play('buzz');
        }
        else {
            var pop = new Audio('sounds/pop1.mp3');

            if (selPlayer == playerNum-1) {
            selPlayer = 0;
            }
            else {
                selPlayer++;
            }
            document.getElementById("playerName").innerHTML = playerList[selPlayer];

            sounds.play('pop');
            sel.classList.remove("btn-primary");
            sel.classList.add("btn-success");
        }

        let grayMines = 0;
        for (let i = 0; i < columns.length; i++) {
            const fSelRow = columns[i].children;
            for (let j = 0; j < fSelRow.length; j++) {
                if (fSelRow[j].classList.contains("btn-primary")) {
                    grayMines++;
                }
            }
        }
        
        if (grayMines == selDiff+1) {
            document.getElementById("playerName").innerHTML = playerList[selPlayer];

            sounds.play('angel');
            badCells.forEach(cell => {
                if (cell.classList.contains("btn-primary")) {
                    cell.classList.remove("btn-primary");
                    cell.classList.add("btn-danger");
                }
            });
            sel.classList.remove("btn-primary");
            sel.classList.add("btn-success");

            setTimeout(() => {
                    sounds.play('loseAudio');
                    document.getElementById("dialog").classList.add("fade-in");
                    document.getElementById("dialog").style.display = "block";
                    document.getElementById("window-title").innerHTML = "<b>" + playerList[selPlayer] + "</b>" + ", te vagy a <b>zugivó!</b>";
                    document.getElementById("window-elements").style.height = "auto";
                    
                    document.getElementById("zugButton").style.display = "block";
                }, 2000);;

            playerDrinks[selPlayer]++;
            vege = true;
            document.getElementById("ujrakezd").style.display = "block";
        }
    }
}

function restart() {
    sounds.play('btnAudio');
    vege = false;
    for (let i = 0; i < columns.length; i++) {
        const fSelRow = columns[i].children;
        for (let j = 0; j < fSelRow.length; j++) {
            fSelRow[j].classList.value = "";
            fSelRow[j].classList.add("btn", "btn-primary", "mine");
        }
    }
    document.getElementById("ujrakezd").style.display = "none";
    sorsolas();
    document.getElementById("zugButton").remove();
    zugButton();
    document.getElementById("jatekosok").innerHTML = "";
    for (let i = 0; i < playerList.length; i++) {
        document.getElementById("jatekosok").innerHTML += playerList[i] + ": " + playerDrinks[i] + "<br>";
    }
}

function info() {
    if (!infoShow) {
        document.getElementById("info").style.display = "block";
        infoShow = true;
    }
    else {
        document.getElementById("info").style.display = "none";
        infoShow = false;
    }
}

function settings() {
    if (!settingsShow) {
        document.getElementById("settings").style.display = "block";
        settingsShow = true;
    }
    else {
        document.getElementById("settings").style.display = "none";
        settingsShow = false;
    }
}

document.getElementById("infoBtn").addEventListener("click", info);
document.getElementById("settingsBtn").addEventListener("click", settings);
document.getElementById("restartBtn").addEventListener("click", restart);
document.getElementById("diffUp").addEventListener("click", 
    function() {
        if (selDiff < 3) {
            sounds.play('btnAudio');
            selDiff++;
            diffChange();
        }
    }
);
document.getElementById("diffDown").addEventListener("click", 
    function() {
        if (selDiff == 23) {
            sounds.play('btnAudio');
            selDiff = 3;
            diffChange();
        }
        else if (selDiff > 0) {
            sounds.play('btnAudio');
            selDiff--;
            diffChange();
        }
    }
);
document.getElementById("difficulty").addEventListener("click", 
    function() {
        if (document.getElementById("difficulty").innerHTML.startsWith("EXTRÉM")) {
            extremPlus();
        }
    }
);