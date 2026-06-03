const lane1 = document.getElementById('lane-1');
const lane2 = document.getElementById('lane-2');
const lane3 = document.getElementById('lane-3');
const lane4 = document.getElementById('lane-4');
const lanes = [lane1, lane2, lane3, lane4];

let comboCount = 0;
const comboDisplay = document.getElementById('combo');

const bgm1 = new Audio(map1);

const keyInputMap = {
    '3': { inputId: 'i1', lane: lane1 },
    'r': { inputId: 'i2', lane: lane2 },
    'i': { inputId: 'i3', lane: lane3 },
    '0': { inputId: 'i4', lane: lane4 }
};

window.addEventListener('keydown', (event) => {
    const keyData = keyInputMap[event.key];
    
    if (keyData) {
        const inputElement = document.getElementById(keyData.inputId);
        if (inputElement) {
            inputElement.classList.add('active');
        }
        checkAndRemoveNotes(keyData.lane);
    }
});

window.addEventListener('keyup', (event) => {
    const keyData = keyInputMap[event.key];
    
    if (keyData) {
        const inputElement = document.getElementById(keyData.inputId);
        if (inputElement) {
            inputElement.classList.remove('active');
        }
    }
});

function dropNote(targetLane) {
    const note = document.createElement('div');
    note.classList.add('falling-note');
    targetLane.appendChild(note);

    const spawnTime = bgm1.currentTime;

    note.isHit = false;

    function drop() {
        if (note.isHit) return;

        const elapsed = bgm1.currentTime - spawnTime;
        
        let top = elapsed * SPEED;
        note.style.top = top + 'px';

        if (top < window.innerHeight) {
            requestAnimationFrame(drop);
        } else {
            note.remove();
            comboCount = 0;
            comboDisplay.innerText = '0 COMBO';
        }
    }
    requestAnimationFrame(drop);
}

function checkAndRemoveNotes(targetLane) {
    const allNotesInLane = targetLane.querySelectorAll('.falling-note');
    const inputCenter = window.innerHeight - 60; 
    const removeRangeMin = inputCenter - 60;
    const removeRangeMax = inputCenter + 60;

    allNotesInLane.forEach((note) => {
        const noteTop = parseInt(note.style.top) || 0;
        const noteCenterY = noteTop + 10; 
        
        if (noteCenterY >= removeRangeMin && noteCenterY <= removeRangeMax) {
            note.isHit = true;
            note.remove();
            updateCombo(); 
        }
    });
}

function updateCombo() {
    comboCount++;
    comboDisplay.innerText = comboCount + ' COMBO'
}

let isGameStarted = false;

window.addEventListener('click', () => {
    if (isGameStarted) return;
    isGameStarted = true;
    
    bgm1.play();
    startGameLoop();
});

function startGameLoop() {
    function checkNoteSpawn() {
        if (bgm1.paused || bgm1.ended) return;

        const currentTime = bgm1.currentTime;

        for (let i = 0; i < noteData.length; i++) {
            const note = noteData[i];

            if (currentTime >= note.time) {
                dropNote(lanes[note.lane]);
                noteData.splice(i, 1);
                i--; 
            }
        }
        requestAnimationFrame(checkNoteSpawn);
    }
    requestAnimationFrame(checkNoteSpawn);
}