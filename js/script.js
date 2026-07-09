// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 1A
// GLOBAL VARIABLES
// ======================================

// ---------- Game State ----------
let level = 0;
let score = 0;
let moves = 0;

let glasses = [];
let originalGlasses = [];
let history = [];

let selected = null;
let isBusy = false;
let animLock = false;

// ---------- Settings ----------
let musicEnabled =
    localStorage.getItem("music") !== "off";

let soundEnabled =
    localStorage.getItem("sound") !== "off";

// ---------- Colors ----------
const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "cyan",
    "pink"
];

// ======================================
// AUDIO ELEMENTS
// ======================================

const clickSound =
    document.getElementById("clickSound");

const pourSound =
    document.getElementById("pourSound");

const winSound =
    document.getElementById("winSound");

const wrongSound =
    document.getElementById("wrongSound");

const bgMusic =
    document.getElementById("bgMusic");

// ======================================
// CLICK SOUND
// ======================================

document.addEventListener("click", (e) => {

    if (!soundEnabled) return;

    if (
        e.target.closest("button") ||
        e.target.closest(".glass")
    ) {

        clickSound.currentTime = 0;

        clickSound.play().catch(() => {});

    }

});

// ======================================
// BUTTON WRAPPERS
// ======================================

function handleStart() {
    startGame();
}

function handleUndo() {
    undo();
}

function handleRestart() {
    restart();
}

function handleNext() {
    nextLevel();
}
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 1B
// START + MENU + SETTINGS
// ======================================

// ================= START GAME =================

function startGame() {

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("settingsScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("winPopup").style.display = "none";

    level = 0;
    score = 0;
    moves = 0;

    history = [];
    selected = null;
    isBusy = false;
    animLock = false;

    document.getElementById("scoreText").innerText =
        "Score : " + score;

    document.getElementById("moveText").innerText =
        "Moves : " + moves;

    if (musicEnabled) {

        bgMusic.currentTime = 0;

        bgMusic.play().catch(() => {});

    }

    load();

}


// ================= BACK TO MENU =================

function backToMenu() {

    bgMusic.pause();
    bgMusic.currentTime = 0;

    history = [];
    selected = null;
    moves = 0;
    isBusy = false;
    animLock = false;

    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("settingsScreen").style.display = "none";
    document.getElementById("winPopup").style.display = "none";

    document.getElementById("startScreen").style.display = "flex";

}


// ================= OPEN SETTINGS =================

function openSettings() {

    bgMusic.pause();
    bgMusic.currentTime = 0;

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("settingsScreen").style.display = "flex";

    document.getElementById("musicToggle").checked =
        musicEnabled;

    document.getElementById("soundToggle").checked =
        soundEnabled;

}


// ================= CLOSE SETTINGS =================

function closeSettings() {

    document.getElementById("settingsScreen").style.display = "none";

    document.getElementById("startScreen").style.display = "flex";

    bgMusic.pause();
    bgMusic.currentTime = 0;

}


// ================= MUSIC =================

function toggleMusic() {

    musicEnabled =
        document.getElementById("musicToggle").checked;

    localStorage.setItem(
        "music",
        musicEnabled ? "on" : "off"
    );

    if (!musicEnabled) {

        bgMusic.pause();
        bgMusic.currentTime = 0;

        return;

    }

    if (
        document.getElementById("gameScreen").style.display === "block"
    ) {

        bgMusic.currentTime = 0;

        bgMusic.play().catch(() => {});

    }

}


// ================= SOUND =================

function toggleSound() {

    soundEnabled =
        document.getElementById("soundToggle").checked;

    localStorage.setItem(
        "sound",
        soundEnabled ? "on" : "off"
    );

}
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 1C
// AUDIO + HELPERS
// ======================================

// ================= SCORE =================

function updateScore(value) {

    score += value;

    // Score negative nahi hone denge
    if (score < 0) {
        score = 0;
    }

    document.getElementById("scoreText").innerText =
        "Score : " + score;

}


// ================= POUR SOUND =================

function playPour() {

    if (!soundEnabled || !pourSound) return;

    // Previous sound stop
    pourSound.pause();

    // Start from beginning
    pourSound.currentTime = 0;

    pourSound.volume = 0.8;

    pourSound.play().catch(() => {});

    // Stop after 1.5 seconds
    setTimeout(() => {

        pourSound.pause();
        pourSound.currentTime = 0;

    }, 1500);

}


// ================= WIN SOUND =================

function playWin() {

    if (!soundEnabled || !winSound) return;

    if (!winSound) return;

    winSound.pause();
    winSound.currentTime = 0;

    winSound.play().catch(() => {});

}


// ================= WRONG SOUND =================

function playWrong() {

    if (!soundEnabled || !wrongSound) return;

    if (!wrongSound) return;

    wrongSound.pause();
    wrongSound.currentTime = 0;

    wrongSound.play().catch(() => {});

}


// ================= WRONG MOVE =================

function wrongMove() {

    playWrong();

    updateScore(-20);

    selected = null;

    draw();

}


// ================= SHUFFLE =================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

}
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 2A
// LEVEL GENERATION
// ======================================

// ================= GENERATE =================

function generate(level) {

    const colorCount =
        Math.min(
            3 + Math.floor(level / 5),
            6
        );

    const emptyGlasses = 2;

    const selectedColors =
        colors.slice(0, colorCount);

    const temp = [];

    // Har color ki 4 layers
    selectedColors.forEach(color => {

        for (let i = 0; i < 4; i++) {

            temp.push(color);

        }

    });

    shuffle(temp);

    const totalGlasses =
        colorCount + emptyGlasses;

    const board = Array.from(

        {
            length: totalGlasses
        },

        () => []

    );

    temp.forEach(color => {

        while (true) {

            const randomGlass =

                Math.floor(

                    Math.random() *
                    totalGlasses

                );

            if (
                board[randomGlass].length < 4
            ) {

                board[randomGlass].push(color);

                break;

            }

        }

    });

    return board;

}


// ================= CHECK SOLVED =================

function isSolved(board) {

    return board.every(glass => {

        if (glass.length === 0)
            return true;

        if (glass.length !== 4)
            return false;

        return glass.every(

            color =>

                color === glass[0]

        );

    });

}


// ================= VALID LEVEL =================

function generateValidLevel() {

    let board;

    do {

        board = generate(level);

    }

    while (isSolved(board));

    return board;

}


// ================= RESET STATE =================

function resetGameState() {

    history = [];

    selected = null;

    moves = 0;

    isBusy = false;

    animLock = false;

    document.getElementById(
        "moveText"
    ).innerText = "Moves : 0";

}


// ================= LOAD LEVEL =================

function load() {

    glasses = generateValidLevel();

    originalGlasses =

        JSON.parse(

            JSON.stringify(glasses)

        );

    resetGameState();

    document.getElementById(
        "levelText"
    ).innerText =
        "Level " + (level + 1);

    document.getElementById(
        "nextBtn"
    ).disabled = true;

    document.getElementById(
        "winPopup"
    ).style.display = "none";

    draw();

}
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 2B
// DRAW + CLICK
// ======================================


// ================= GET GLASS =================

function getGlassEl(index) {

    const game = document.getElementById("game");

    return game.children[index];

}


// ================= DRAW =================

function draw() {

    const game = document.getElementById("game");

    game.innerHTML = "";

    glasses.forEach((glass, index) => {

        const div = document.createElement("div");

        div.className = "glass";

        div.dataset.index = index;

        // Selected Highlight
        if (selected === index) {
            div.classList.add("selected");
        }

        // ⭐ Completed Glass Highlight
        if (
            glass.length === 4 &&
            glass.every(color => color === glass[0])
        ) {
            div.classList.add("completed");
        }

        // Water Layers
        glass.forEach(color => {

            const layer = document.createElement("div");

            layer.className = "layer";

            layer.style.background = color;

            div.appendChild(layer);

        });

        // Click Event
        div.addEventListener("click", () => {
            clickGlass(index);
        });

        game.appendChild(div);

    });

}
// ================= CLICK GLASS =================

function clickGlass(index) {

    if (isBusy || animLock)
        return;

    // Empty Glass
    if (
        selected === null &&
        glasses[index].length === 0
    ) {

        return;

    }

    // First Selection
    if (selected === null) {

        selected = index;

        draw();

        return;

    }

    // Same Glass
    if (selected === index) {

        selected = null;

        draw();

        return;

    }

    // Pour
    pour(selected, index);

}
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 2C-1
// ANIMATION HELPERS
// ======================================


// ================= LIFT GLASS =================

function liftGlass(index) {

    const el = getGlassEl(index);

    if (!el) return;

    el.classList.add("lift");

}


// ================= TILT GLASS =================

function tiltGlass(fromIndex, toIndex) {

    const el = getGlassEl(fromIndex);

    if (!el) return;


    const direction =
        fromIndex < toIndex ? 1 : -1;


    el.style.transform =
    `translateY(-105px) rotate(${direction * 38}deg)`;


    el.classList.add("pouring");

}


// ================= RESET GLASS =================

function resetGlass(index) {

    const el = getGlassEl(index);

    if (!el) return;


    el.style.transform = "";

    el.classList.remove("lift");

    el.classList.remove("pouring");

    el.classList.remove("receiving");

    el.classList.remove("bounce");

}


// ================= TARGET GLOW =================

function glowGlass(index) {

    const el = getGlassEl(index);

    if (!el) return;


    el.classList.add("receiving");


    setTimeout(() => {

        el.classList.remove("receiving");

    }, 300);

}


// ================= BOUNCE EFFECT =================

function bounceGlass(index) {

    const el = getGlassEl(index);

    if (!el) return;


    el.classList.add("bounce");


    setTimeout(() => {

        el.classList.remove("bounce");

    }, 350);

}
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 2C-2
// WATER ANIMATION EFFECTS
// ======================================


// ================= CREATE WATER STREAM =================

function createStream(fromEl, toEl, color) {

    if (!fromEl || !toEl) return;


    const stream = document.createElement("div");

    stream.className = "stream";


    const from =
        fromEl.getBoundingClientRect();

    const to =
        toEl.getBoundingClientRect();


    stream.style.left =
        (from.left + from.width / 2) + "px";


    stream.style.top =
        (from.top + from.height / 2) + "px";


    stream.style.height =
        Math.abs(to.top - from.top) + "px";


    stream.style.background = color;


    document.body.appendChild(stream);


    setTimeout(() => {

        stream.remove();

    }, 450);

}


// ================= CREATE RIPPLE =================

function createRipple(toEl) {

    if (!toEl) return;


    const ripple =
        document.createElement("div");


    ripple.className = "ripple";


    toEl.appendChild(ripple);


    setTimeout(() => {

        ripple.remove();

    }, 450);

}


// ================= CREATE BUBBLES =================

function createBubbles(toEl) {

    if (!toEl) return;


    for (let i = 0; i < 3; i++) {


        const bubble =
            document.createElement("div");


        bubble.className = "bubble";


        bubble.style.left =
            (20 + Math.random() * 60) + "%";


        bubble.style.bottom =
            "10px";


        bubble.style.animationDelay =
            (i * 0.1) + "s";


        toEl.appendChild(bubble);


        setTimeout(() => {

            bubble.remove();

        }, 800);

    }

}
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 2C-3
// FINAL POUR FUNCTION
// ======================================


// ================= POUR =================

function pour(from, to) {


    if (isBusy || animLock)
        return;


    const source = glasses[from];

    const target = glasses[to];


    // Empty source
    if (source.length === 0) {

        wrongMove();

        return;

    }


    // Full target
    if (target.length >= 4) {

        wrongMove();

        return;

    }


    const color =
        source[source.length - 1];


    // Different color
    if (
        target.length > 0 &&
        target[target.length - 1] !== color
    ) {

        wrongMove();

        return;

    }



    // Save state for undo

    history.push(
        JSON.parse(
            JSON.stringify(glasses)
        )
    );



    moves++;

    document.getElementById("moveText").innerText =
        "Moves : " + moves;



    updateScore(10);



    playPour();



    isBusy = true;

    animLock = true;



    const fromEl =
        getGlassEl(from);


    const toEl =
        getGlassEl(to);



    // Animation start

    liftGlass(from);

    tiltGlass(from, to);

    glowGlass(to);



    createStream(
        fromEl,
        toEl,
        color
    );



    setTimeout(() => {


        let space =
            4 - target.length;



        while (

            source.length > 0 &&

            source[source.length - 1] === color &&

            space > 0

        ) {


            target.push(
                source.pop()
            );


            space--;

        }



        draw();



        const newTarget =
            getGlassEl(to);



        createRipple(newTarget);

        createBubbles(newTarget);



        setTimeout(() => {


            resetGlass(from);

            resetGlass(to);


            bounceGlass(to);



            selected = null;

            isBusy = false;

            animLock = false;



            draw();


            checkWin();



        },250);



    },450);


}
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 3A
// UNDO + RESTART
// ======================================


// ================= UNDO =================

function undo() {


    if (history.length === 0)
        return;


    glasses = history.pop();


    selected = null;


    moves = Math.max(
        0,
        moves - 1
    );


    updateScore(-10);



    document.getElementById("moveText").innerText =
        "Moves : " + moves;



    draw();

}



// ================= RESTART =================

function restart() {


    glasses =
        JSON.parse(
            JSON.stringify(originalGlasses)
        );



    history = [];

    selected = null;

    moves = 0;

    isBusy = false;

    animLock = false;



    score = 0;



    document.getElementById("moveText").innerText =
        "Moves : 0";



    document.getElementById("scoreText").innerText =
        "Score : 0";



    document.getElementById("nextBtn").disabled =
        true;



    document.getElementById("winPopup").style.display =
        "none";



    if (musicEnabled) {

        bgMusic.play().catch(()=>{});

    }



    draw();


}
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 3B
// WIN + NEXT LEVEL
// ======================================


// ================= CHECK WIN =================

function checkWin() {


    const win = glasses.every(glass => {


        // Empty glass allowed

        if (glass.length === 0) {

            return true;

        }


        // Full hona chahiye

        if (glass.length !== 4) {

            return false;

        }


        // Same color check

        return glass.every(
            color =>
                color === glass[0]
        );


    });



    if (!win) {

        return;

    }



    playWin();



    bgMusic.pause();



    document.getElementById("nextBtn").disabled =
        false;



    document.getElementById("winPopup").style.display =
        "flex";


}



// ================= NEXT LEVEL =================

function nextLevel() {


    level++;


    history = [];

    selected = null;

    moves = 0;

    isBusy = false;

    animLock = false;



    document.getElementById("winPopup").style.display =
        "none";



    if (musicEnabled) {


        bgMusic.currentTime = 0;


        bgMusic.play().catch(()=>{});


    }



    load();


}
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 4A
// EXIT + SHORTCUTS + LOAD SETTINGS
// ======================================


// ================= EXIT GAME =================

function exitGame() {


    try {


        // Web2APK / Website2APK

        if (
            window.Website2APK &&
            typeof window.Website2APK.exitApp === "function"
        ) {

            window.Website2APK.exitApp();

            return;

        }



        // Cordova

        if (
            window.navigator.app &&
            window.navigator.app.exitApp
        ) {

            navigator.app.exitApp();

            return;

        }



        // Capacitor

        if (
            window.Capacitor &&
            window.Capacitor.Plugins &&
            window.Capacitor.Plugins.App
        ) {

            window.Capacitor.Plugins.App.exitApp();

            return;

        }



    }
    catch(error) {

        console.log(
            "Exit Error:",
            error
        );

    }



    alert(
        "Exit works only inside Android APK."
    );


}



// ================= STOP MUSIC =================

window.addEventListener(
    "beforeunload",
    () => {

        if (bgMusic) {

            bgMusic.pause();

        }

    }
);



// ================= KEYBOARD CONTROL =================

document.addEventListener(
    "keydown",
    (e) => {


        // CTRL + Z = Undo

        if (
            e.ctrlKey &&
            e.key.toLowerCase() === "z"
        ) {

            e.preventDefault();

            undo();

        }



        // R = Restart

        if (
            e.key.toLowerCase() === "r"
        ) {

            restart();

        }


    }
);



// ================= LOAD SETTINGS =================

window.onload = () => {


    const musicToggle =
        document.getElementById(
            "musicToggle"
        );


    const soundToggle =
        document.getElementById(
            "soundToggle"
        );



    if (musicToggle) {

        musicToggle.checked =
            musicEnabled;

    }



    if (soundToggle) {

        soundToggle.checked =
            soundEnabled;

    }


};
// ======================================
// WATER SORT PRO
// SCRIPT.JS
// PART 4B
// FINAL CLEANUP + SAFETY
// ======================================


// ================= SAFE ELEMENT CHECK =================

function safeText(id, text) {

    const el = document.getElementById(id);

    if (el) {

        el.innerText = text;

    }

}



// ================= INITIAL UI UPDATE =================

function updateUI() {


    safeText(
        "levelText",
        "Level " + (level + 1)
    );


    safeText(
        "moveText",
        "Moves : " + moves
    );


    safeText(
        "scoreText",
        "Score : " + score
    );


}



// ================= PREVENT DOUBLE TAP =================

document.addEventListener(
    "touchstart",
    () => {

        if (isBusy) {

            return;

        }

    },
    {
        passive:true
    }
);



// ================= AUTO SAVE SETTINGS =================

function saveSettings() {


    localStorage.setItem(
        "music",
        musicEnabled ? "on" : "off"
    );


    localStorage.setItem(
        "sound",
        soundEnabled ? "on" : "off"
    );


}



// ================= RESET ALL DATA =================

function resetAllData() {


    level = 0;

    score = 0;

    moves = 0;


    glasses = [];

    originalGlasses = [];

    history = [];


    selected = null;

    isBusy = false;

    animLock = false;



    updateUI();


}