const binaryToHexagram = {
    "111111": 1, "000000": 2, "100010": 3, "010001": 4, "111010": 5, "010111": 6,
    "010000": 7, "000010": 8, "111011": 9, "110111": 10, "111000": 11, "000111": 12,
    "101111": 13, "111101": 14, "001000": 15, "000100": 16, "100110": 17, "011001": 18,
    "110000": 19, "000011": 20, "100101": 21, "101001": 22, "000001": 23, "100000": 24,
    "100111": 25, "111001": 26, "100001": 27, "011110": 28, "010010": 29, "101101": 30,
    "001110": 31, "011100": 32, "001111": 33, "111100": 34, "000101": 35, "101000": 36,
    "101011": 37, "110101": 38, "001010": 39, "010100": 40, "110001": 41, "100011": 42,
    "111110": 43, "011111": 44, "000110": 45, "011000": 46, "010110": 47, "011010": 48,
    "101110": 49, "011101": 50, "100100": 51, "001001": 52, "001011": 53, "110100": 54,
    "101100": 55, "001101": 56, "011011": 57, "110110": 58, "010011": 59, "110010": 60,
    "110011": 61, "001100": 62, "101010": 63, "010101": 64
}

const hexagramToBinary = Object.fromEntries(Object.entries(binaryToHexagram).map(([key, value]) => [value, key]));

const getBinaryFromHexagramNumbers = hexagramNumber => hexagramNumber.map(hex => hexagramToBinary[hex]);


const hexagramsBasicInfo = {
    1: { "kingwen": 1, "pinyin": "Qián", "hanzi": "乾", "unicode": "䷀" },
    2: { "kingwen": 2, "pinyin": "Kūn", "hanzi": "坤", "unicode": "䷁" },
    3: { "kingwen": 3, "pinyin": "Zhūn", "hanzi": "屯", "unicode": "䷂" },
    4: { "kingwen": 4, "pinyin": "Méng", "hanzi": "蒙", "unicode": "䷃" },
    5: { "kingwen": 5, "pinyin": "Xū", "hanzi": "需", "unicode": "䷄" },
    6: { "kingwen": 6, "pinyin": "Sòng", "hanzi": "訟", "unicode": "䷅" },
    7: { "kingwen": 7, "pinyin": "Shī", "hanzi": "師", "unicode": "䷆" },
    8: { "kingwen": 8, "pinyin": "Bǐ", "hanzi": "比", "unicode": "䷇" },
    9: { "kingwen": 9, "pinyin": "Xiǎo Xù", "hanzi": "小畜", "unicode": "䷈" },
    10: { "kingwen": 10, "pinyin": "Lǚ", "hanzi": "履", "unicode": "䷉" },
    11: { "kingwen": 11, "pinyin": "Tài", "hanzi": "泰", "unicode": "䷊" },
    12: { "kingwen": 12, "pinyin": "Pǐ", "hanzi": "否", "unicode": "䷋" },
    13: { "kingwen": 13, "pinyin": "Tóng Rén", "hanzi": "同人", "unicode": "䷌" },
    14: { "kingwen": 14, "pinyin": "Dà Yǒu", "hanzi": "大有", "unicode": "䷍" },
    15: { "kingwen": 15, "pinyin": "Qiān", "hanzi": "謙", "unicode": "䷎" },
    16: { "kingwen": 16, "pinyin": "Yù", "hanzi": "豫", "unicode": "䷏" },
    17: { "kingwen": 17, "pinyin": "Suí", "hanzi": "隨", "unicode": "䷐" },
    18: { "kingwen": 18, "pinyin": "Gŭ", "hanzi": "蠱", "unicode": "䷑" },
    19: { "kingwen": 19, "pinyin": "Lín", "hanzi": "臨", "unicode": "䷒" },
    20: { "kingwen": 20, "pinyin": "Guān", "hanzi": "觀", "unicode": "䷓" },
    21: { "kingwen": 21, "pinyin": "Shì Kè", "hanzi": "噬嗑", "unicode": "䷔" },
    22: { "kingwen": 22, "pinyin": "Bì", "hanzi": "賁", "unicode": "䷕" },
    23: { "kingwen": 23, "pinyin": "Bō", "hanzi": "剝", "unicode": "䷖" },
    24: { "kingwen": 24, "pinyin": "Fù", "hanzi": "復", "unicode": "䷗" },
    25: { "kingwen": 25, "pinyin": "Wú Wàng", "hanzi": "無妄", "unicode": "䷘" },
    26: { "kingwen": 26, "pinyin": "Dà Xù", "hanzi": "大畜", "unicode": "䷙" },
    27: { "kingwen": 27, "pinyin": "Yí", "hanzi": "頤", "unicode": "䷚" },
    28: { "kingwen": 28, "pinyin": "Dà Guò", "hanzi": "大過", "unicode": "䷛" },
    29: { "kingwen": 29, "pinyin": "Kǎn", "hanzi": "坎", "unicode": "䷜" },
    30: { "kingwen": 30, "pinyin": "Lí", "hanzi": "離", "unicode": "䷝" },
    31: { "kingwen": 31, "pinyin": "Xián", "hanzi": "咸", "unicode": "䷞" },
    32: { "kingwen": 32, "pinyin": "Héng", "hanzi": "恆", "unicode": "䷟" },
    33: { "kingwen": 33, "pinyin": "Dùn", "hanzi": "遯", "unicode": "䷠" },
    34: { "kingwen": 34, "pinyin": "Dà Zhuàng", "hanzi": "大壯", "unicode": "䷡" },
    35: { "kingwen": 35, "pinyin": "Jìn", "hanzi": "晉", "unicode": "䷢" },
    36: { "kingwen": 36, "pinyin": "Míng Yí", "hanzi": "明夷", "unicode": "䷣" },
    37: { "kingwen": 37, "pinyin": "Jiā Rén", "hanzi": "家人", "unicode": "䷤" },
    38: { "kingwen": 38, "pinyin": "Kuí", "hanzi": "睽", "unicode": "䷥" },
    39: { "kingwen": 39, "pinyin": "Jiǎn", "hanzi": "蹇", "unicode": "䷦" },
    40: { "kingwen": 40, "pinyin": "Xiè", "hanzi": "解", "unicode": "䷧" },
    41: { "kingwen": 41, "pinyin": "Sǔn", "hanzi": "損", "unicode": "䷨" },
    42: { "kingwen": 42, "pinyin": "Yì", "hanzi": "益", "unicode": "䷩" },
    43: { "kingwen": 43, "pinyin": "Guài", "hanzi": "夬", "unicode": "䷪" },
    44: { "kingwen": 44, "pinyin": "Gòu", "hanzi": "姤", "unicode": "䷫" },
    45: { "kingwen": 45, "pinyin": "Cuì", "hanzi": "萃", "unicode": "䷬" },
    46: { "kingwen": 46, "pinyin": "Shēng", "hanzi": "升", "unicode": "䷭" },
    47: { "kingwen": 47, "pinyin": "Kùn", "hanzi": "困", "unicode": "䷮" },
    48: { "kingwen": 48, "pinyin": "Jǐng", "hanzi": "井", "unicode": "䷯" },
    49: { "kingwen": 49, "pinyin": "Gé", "hanzi": "革", "unicode": "䷰" },
    50: { "kingwen": 50, "pinyin": "Dǐng", "hanzi": "鼎", "unicode": "䷱" },
    51: { "kingwen": 51, "pinyin": "Zhèn", "hanzi": "震", "unicode": "䷲" },
    52: { "kingwen": 52, "pinyin": "Gèn", "hanzi": "艮", "unicode": "䷳" },
    53: { "kingwen": 53, "pinyin": "Jiàn", "hanzi": "漸", "unicode": "䷴" },
    54: { "kingwen": 54, "pinyin": "Guī Mèi", "hanzi": "歸妹", "unicode": "䷵" },
    55: { "kingwen": 55, "pinyin": "Fēng", "hanzi": "豐", "unicode": "䷶" },
    56: { "kingwen": 56, "pinyin": "Lǚ", "hanzi": "旅", "unicode": "䷷" },
    57: { "kingwen": 57, "pinyin": "Xùn", "hanzi": "巽", "unicode": "䷸" },
    58: { "kingwen": 58, "pinyin": "Duì", "hanzi": "兌", "unicode": "䷹" },
    59: { "kingwen": 59, "pinyin": "Huàn", "hanzi": "渙", "unicode": "䷺" },
    60: { "kingwen": 60, "pinyin": "Jié", "hanzi": "節", "unicode": "䷻" },
    61: { "kingwen": 61, "pinyin": "Zhōng Fú", "hanzi": "中孚", "unicode": "䷼" },
    62: { "kingwen": 62, "pinyin": "Xiǎo Guò", "hanzi": "小過", "unicode": "䷽" },
    63: { "kingwen": 63, "pinyin": "Jì Jì", "hanzi": "既濟", "unicode": "䷾" },
    64: { "kingwen": 64, "pinyin": "Wèi Jì", "hanzi": "未濟", "unicode": "䷿" }
}
const getHexagramsInfoFromHexArray = hexagrams => hexagrams.map(hexagram => hexagramsBasicInfo[hexagram]);
const getHexagramFromBinary = binary => binaryToHexagram[binary];

function generateBinaryFromValues(values) {
    const valueToBinary = { 6: ["0", "1"], 7: "1", 8: "0", 9: ["1", "0"] }
    let binaryPrimary = "";
    let binarySecondary = "";
    values.forEach(value => {
        let valPrimary, valSecondary;
        if (typeof (valueToBinary[value]) == "string") {
            valPrimary = valueToBinary[value];
            valSecondary = valueToBinary[value];
        } else {
            valPrimary = valueToBinary[value][0];
            valSecondary = valueToBinary[value][1];
        }
        binaryPrimary += valPrimary;
        binarySecondary += valSecondary;
    });
    return [binaryPrimary, binarySecondary];
}

function getHexagramFromValues(values) {
    let binaryArray = generateBinaryFromValues(values);
    // filter duplicates, map value(s) to hexagram, and return
    let resultArray = binaryArray
        .filter((value, index, array) => array.indexOf(value) === index)
        .map(getHexagramFromBinary);
    console.log(resultArray);
    return resultArray;
}

const getHexagramBasicInfo = (hexagrams) => hexagrams.map(hexagram => hexagramsBasicInfo[hexagram]);


export { getHexagramFromValues, getHexagramsInfoFromHexArray, getBinaryFromHexagramNumbers, getHexagramBasicInfo };
