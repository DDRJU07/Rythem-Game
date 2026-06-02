const lane1 = document.getElementById('lane-1');
const lane2 = document.getElementById('lane-2');
const lane3 = document.getElementById('lane-3');
const lane4 = document.getElementById('lane-4');
const lanes = [lane1, lane2, lane3, lane4];

let comboCount = 0;
const comboDisplay = document.getElementById('combo');

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

    let top = 0;
    const speed = 3;

    note.isHit = false;

    function drop() {

        if (note.isHit) return;
        
        top += speed;
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

function spawnRandomNote() {
    const randomIndex = Math.floor(Math.random() * 4);
    const selectedLane = lanes[randomIndex];
    dropNote(selectedLane);
}

function checkAndRemoveNotes(targetLane) {
    const allNotesInLane = targetLane.querySelectorAll('.falling-note');
    const inputElement = targetLane.querySelector('.input');
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

setInterval(() => {
    spawnRandomNote()
}, 200)