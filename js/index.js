
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

var wrongMine = new Audio('sounds/wm.mp3');
var loseAudio = new Audio('sounds/lose.mp3');
var btnAudio = new Audio('sounds/button.mp3');
let angel = new Audio('sounds/angel.mp3');

let infoShow = false;

let randCol;
let selCol;
let rows;
let randRow;
let selRow;

function sorsolas() {
    randCol = Math.floor(Math.random() * 5);
    selCol = columns[randCol];
    rows = selCol.children;
    randRow = Math.floor(Math.random() * 5);
    selRow = rows[randRow];
}

let playerNum = 0;
let playerList = [];
let playerDrinks = [];
let selPlayer = 0;

const zugTexts = [
    "Beletörődtem sorsomba...",
    "Küldd, amíg meleg!",
    "Ez is az én hibám volt.",
    "Egészségemre, többé-kevésbé!",
    "Na jó, csak most az egyszer... újra.",
    "Torkon csúszik, mint a vereség.",
    "Koccintsunk... velem. Egyedül.",
    "Legalább nem víz.",
    "Ezt is megiszom helyettetek.",
    "Vesztesként is győztes vagyok... a májgyilkolásban.",
    "A zugivó cím büszke tulajdonosa lettem!",
    "Csak a gyengék nem bírják. Én sem.",
    "Nem is vagyok szomjas... még.",
    "Ez az utolsó... talán.",
    "Csak a májam tiltakozik.",
    "Szóljon valaki anyunak!",
    "Így kezdődnek a legendák... vagy a másnapok.",
    "Fel a fejjel, le a feles!",
    "A szabályok kegyetlenek, mint ez a pálinka.",
    "Zugivás? Ez már művészet.",
    "Nem vesztettem, csak inni akartam.",
    "Így jár, aki lassan nyomja a gombot."
];

function jatekosMegadas() {
    document.getElementById("dialog").style.display = "block";
    document.getElementById("window-title").innerHTML = "Hányan játszanak?"

    document.getElementById("window-btn").onclick = function() {
        btnAudio.play();
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
                btnAudio.play();
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
        btnAudio.play();
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
        if (sel == selRow) {
            wrongMine.play();
            for (let i = 0; i < columns.length; i++) {
                const fSelRow = columns[i].children;
                for (let j = 0; j < fSelRow.length; j++) {
                    fSelRow[j].classList.remove("btn-primary");
                    fSelRow[j].classList.add("btn-secondary");
                }
            }
            sel.classList.remove("btn-primary");
            sel.classList.add("btn-danger");

            setTimeout(() => {
                    loseAudio.play();
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
            var buzz = new Audio('sounds/buzz.mp3');
            buzz.play();
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

            pop.play();
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
        if (grayMines == 1) {
            document.getElementById("playerName").innerHTML = playerList[selPlayer];

            angel.play();
            for (let i = 0; i < columns.length; i++) {
                const fSelRow = columns[i].children;
                for (let j = 0; j < fSelRow.length; j++) {
                    if (fSelRow[j].classList.contains("btn-primary")) {
                        fSelRow[j].classList.remove("btn-primary");
                        fSelRow[j].classList.add("btn-danger");
                    }
                }
            }
            sel.classList.remove("btn-primary");
            sel.classList.add("btn-success");

            setTimeout(() => {
                    loseAudio.play();
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
    btnAudio.play();
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