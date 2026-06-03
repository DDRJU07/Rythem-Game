const map1 = '../../src/그저네게맑아라/그저네게맑아라.mp3';

const BPM = 140;

const OFFSET = 0.15;

const SPEED = 800;

const beatData = [
    { beat: 1, lane: 0 },
    { beat: 1.5, lane: 1 },
    { beat: 2, lane: 2 },
    { beat: 3.5, lane: 1 },
    { beat: 4, lane: 3 },
    { beat: 5, lane: 2 },
    { beat: 5.5, lane: 0 },
    { beat: 6, lane: 2 },
    { beat: 9, lane: 1 },
    { beat: 9, lane: 3 },
    { beat: 9.5, lane: 2 },
    { beat: 10, lane: 1 },
    { beat: 10, lane: 3 },
    { beat: 11.5, lane: 0 },
    { beat: 12, lane: 2 },
    { beat: 13, lane: 0 },
    { beat: 13.5, lane: 0 },
    { beat: 14, lane: 1 },
    { beat: 14, lane: 2 },
    { beat: 14.5, lane: 3 },
    { beat: 15, lane: 1 },
    { beat: 15, lane: 2 },
    { beat: 15.5, lane: 0 },
    { beat: 16, lane: 1 },
    { beat: 16, lane: 2 },
];

const noteData = beatData.map(item => {
    return {
        time: item.beat * (60 / BPM) + OFFSET,
        lane: item.lane
    };
});C