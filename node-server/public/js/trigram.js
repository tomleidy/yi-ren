
const binaryToTrigram = {
    "111": 1, "011": 2, "101": 3, "001": 4,
    "110": 5, "010": 6, "100": 7, "000": 8
};

const trigramToBinary = Object.fromEntries(Object.entries(binaryToTrigram).map(([key, value]) => [value, key]));

const trigramsBasicInfo = {
    1: { "fuxi": "1", "pinyin": "Qián", "hanzi": "乾", "unicode": "☰", "english": "Heaven" },
    2: { "fuxi": "7", "pinyin": "Duì", "hanzi": "兌", "unicode": "☱", "english": "Lake" },
    3: { "fuxi": "6", "pinyin": "Lí", "hanzi": "離", "unicode": "☲", "english": "Fire" },
    4: { "fuxi": "5", "pinyin": "Zhèn", "hanzi": "震", "unicode": "☳", "english": "Thunder" },
    5: { "fuxi": "4", "pinyin": "Xùn", "hanzi": "巽", "unicode": "☴", "english": "Wind" },
    6: { "fuxi": "2", "pinyin": "Kǎn", "hanzi": "坎", "unicode": "☵", "english": "Water" },
    7: { "fuxi": "3", "pinyin": "Gèn", "hanzi": "艮", "unicode": "☶", "english": "Mountain" },
    8: { "fuxi": "8", "pinyin": "Kūn", "hanzi": "坤", "unicode": "☷", "english": "Earth" }
}

export { binaryToTrigram, trigramToBinary, trigramsBasicInfo };