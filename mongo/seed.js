db.trigrams.insertMany([
    { "binary": "111", "fu xi": 1, "king wen": 1, "pinyin": "Qián", "hanzi": "乾", "unicode": "☰", "english": "Heaven" },
    { "binary": "011", "fu xi": 7, "king wen": 2, "pinyin": "Duì", "hanzi": "兌", "unicode": "☱", "english": "Lake" },
    { "binary": "101", "fu xi": 6, "king wen": 3, "pinyin": "Lí", "hanzi": "離", "unicode": "☲", "english": "Fire" },
    { "binary": "001", "fu xi": 5, "king wen": 4, "pinyin": "Zhèn", "hanzi": "震", "unicode": "☳", "english": "Thunder" },
    { "binary": "110", "fu xi": 4, "king wen": 5, "pinyin": "Xùn", "hanzi": "巽", "unicode": "☴", "english": "Wind" },
    { "binary": "010", "fu xi": 2, "king wen": 6, "pinyin": "Kǎn", "hanzi": "坎", "unicode": "☵", "english": "Water" },
    { "binary": "100", "fu xi": 3, "king wen": 7, "pinyin": "Gèn", "hanzi": "艮", "unicode": "☶", "english": "Mountain" },
    { "binary": "000", "fu xi": 8, "king wen": 8, "pinyin": "Kūn", "hanzi": "坤", "unicode": "☷", "english": "Earth" }], { ordered: false })
db.trigram.createIndex({ "binary": 1 })



db.hexagrams.insertMany([
    { "lowerBinary": "111", "upperBinary": "111", "king wen": 1, "pinyin": "Qián", "hanzi": "乾", "unicode": "䷀" },
    { "lowerBinary": "000", "upperBinary": "000", "king wen": 2, "pinyin": "Kūn", "hanzi": "坤", "unicode": "䷁" },
    { "lowerBinary": "100", "upperBinary": "010", "king wen": 3, "pinyin": "Zhūn", "hanzi": "屯", "unicode": "䷂" },
    { "lowerBinary": "010", "upperBinary": "001", "king wen": 4, "pinyin": "Méng", "hanzi": "蒙", "unicode": "䷃" },
    { "lowerBinary": "111", "upperBinary": "010", "king wen": 5, "pinyin": "Xū", "hanzi": "需", "unicode": "䷄" },
    { "lowerBinary": "010", "upperBinary": "111", "king wen": 6, "pinyin": "Sòng", "hanzi": "訟", "unicode": "䷅" },
    { "lowerBinary": "010", "upperBinary": "000", "king wen": 7, "pinyin": "Shī", "hanzi": "師", "unicode": "䷆" },
    { "lowerBinary": "000", "upperBinary": "010", "king wen": 8, "pinyin": "Bǐ", "hanzi": "比", "unicode": "䷇" },
    { "lowerBinary": "111", "upperBinary": "011", "king wen": 9, "pinyin": "Xiǎo Xù", "hanzi": "小畜", "unicode": "䷈" },
    { "lowerBinary": "110", "upperBinary": "111", "king wen": 10, "pinyin": "Lǚ", "hanzi": "履", "unicode": "䷉" },
    { "lowerBinary": "111", "upperBinary": "000", "king wen": 11, "pinyin": "Tài", "hanzi": "泰", "unicode": "䷊" },
    { "lowerBinary": "000", "upperBinary": "111", "king wen": 12, "pinyin": "Pǐ", "hanzi": "否", "unicode": "䷋" },
    { "lowerBinary": "101", "upperBinary": "111", "king wen": 13, "pinyin": "Tóng Rén", "hanzi": "同人", "unicode": "䷌" },
    { "lowerBinary": "111", "upperBinary": "101", "king wen": 14, "pinyin": "Dà Yǒu", "hanzi": "大有", "unicode": "䷍" },
    { "lowerBinary": "001", "upperBinary": "000", "king wen": 15, "pinyin": "Qiān", "hanzi": "謙", "unicode": "䷎" },
    { "lowerBinary": "000", "upperBinary": "100", "king wen": 16, "pinyin": "Yù", "hanzi": "豫", "unicode": "䷏" }
], { ordered: false })
db.hexagram.insertMany([
    { "lowerBinary": "100", "upperBinary": "110", "king wen": 17, "pinyin": "Suí", "hanzi": "隨", "unicode": "䷐" },
    { "lowerBinary": "011", "upperBinary": "001", "king wen": 18, "pinyin": "Gŭ", "hanzi": "蠱", "unicode": "䷑" },
    { "lowerBinary": "110", "upperBinary": "000", "king wen": 19, "pinyin": "Lín", "hanzi": "臨", "unicode": "䷒" },
    { "lowerBinary": "000", "upperBinary": "011", "king wen": 20, "pinyin": "Guān", "hanzi": "觀", "unicode": "䷓" },
    { "lowerBinary": "100", "upperBinary": "101", "king wen": 21, "pinyin": "Shì Kè", "hanzi": "噬嗑", "unicode": "䷔" },
    { "lowerBinary": "101", "upperBinary": "001", "king wen": 22, "pinyin": "Bì", "hanzi": "賁", "unicode": "䷕" },
    { "lowerBinary": "000", "upperBinary": "001", "king wen": 23, "pinyin": "Bō", "hanzi": "剝", "unicode": "䷖" },
    { "lowerBinary": "100", "upperBinary": "000", "king wen": 24, "pinyin": "Fù", "hanzi": "復", "unicode": "䷗" },
    { "lowerBinary": "100", "upperBinary": "111", "king wen": 25, "pinyin": "Wú Wàng", "hanzi": "無妄", "unicode": "䷘" },
    { "lowerBinary": "111", "upperBinary": "001", "king wen": 26, "pinyin": "Dà Xù", "hanzi": "大畜", "unicode": "䷙" },
    { "lowerBinary": "100", "upperBinary": "001", "king wen": 27, "pinyin": "Yí", "hanzi": "頤", "unicode": "䷚" },
    { "lowerBinary": "011", "upperBinary": "110", "king wen": 28, "pinyin": "Dà Guò", "hanzi": "大過", "unicode": "䷛" },
    { "lowerBinary": "010", "upperBinary": "010", "king wen": 29, "pinyin": "Kǎn", "hanzi": "坎", "unicode": "䷜" },
    { "lowerBinary": "101", "upperBinary": "101", "king wen": 30, "pinyin": "Lí", "hanzi": "離", "unicode": "䷝" },
    { "lowerBinary": "001", "upperBinary": "110", "king wen": 31, "pinyin": "Xián", "hanzi": "咸", "unicode": "䷞" },
    { "lowerBinary": "011", "upperBinary": "100", "king wen": 32, "pinyin": "Héng", "hanzi": "恆", "unicode": "䷟" },
], { ordered: false })
db.hexagram.insertMany([
    { "lowerBinary": "001", "upperBinary": "111", "king wen": 33, "pinyin": "Dùn", "hanzi": "遯", "unicode": "䷠" },
    { "lowerBinary": "111", "upperBinary": "100", "king wen": 34, "pinyin": "Dà Zhuàng", "hanzi": "大壯", "unicode": "䷡" },
    { "lowerBinary": "000", "upperBinary": "101", "king wen": 35, "pinyin": "Jìn", "hanzi": "晉", "unicode": "䷢" },
    { "lowerBinary": "101", "upperBinary": "000", "king wen": 36, "pinyin": "Míng Yí", "hanzi": "明夷", "unicode": "䷣" },
    { "lowerBinary": "101", "upperBinary": "011", "king wen": 37, "pinyin": "Jiā Rén", "hanzi": "家人", "unicode": "䷤" },
    { "lowerBinary": "110", "upperBinary": "101", "king wen": 38, "pinyin": "Kuí", "hanzi": "睽", "unicode": "䷥" },
    { "lowerBinary": "001", "upperBinary": "010", "king wen": 39, "pinyin": "Jiǎn", "hanzi": "蹇", "unicode": "䷦" },
    { "lowerBinary": "010", "upperBinary": "100", "king wen": 40, "pinyin": "Xiè", "hanzi": "解", "unicode": "䷧" },
    { "lowerBinary": "110", "upperBinary": "001", "king wen": 41, "pinyin": "Sǔn", "hanzi": "損", "unicode": "䷨" },
    { "lowerBinary": "100", "upperBinary": "011", "king wen": 42, "pinyin": "Yì", "hanzi": "益", "unicode": "䷩" },
    { "lowerBinary": "111", "upperBinary": "110", "king wen": 43, "pinyin": "Guài", "hanzi": "夬", "unicode": "䷪" },
    { "lowerBinary": "011", "upperBinary": "111", "king wen": 44, "pinyin": "Gòu", "hanzi": "姤", "unicode": "䷫" },
    { "lowerBinary": "000", "upperBinary": "110", "king wen": 45, "pinyin": "Cuì", "hanzi": "萃", "unicode": "䷬" },
    { "lowerBinary": "011", "upperBinary": "000", "king wen": 46, "pinyin": "Shēng", "hanzi": "升", "unicode": "䷭" },
    { "lowerBinary": "010", "upperBinary": "110", "king wen": 47, "pinyin": "Kùn", "hanzi": "困", "unicode": "䷮" },
    { "lowerBinary": "011", "upperBinary": "010", "king wen": 48, "pinyin": "Jǐng", "hanzi": "井", "unicode": "䷯" },
], { ordered: false })
db.hexagram.insertMany([
    { "lowerBinary": "101", "upperBinary": "110", "king wen": 49, "pinyin": "Gé", "hanzi": "革", "unicode": "䷰" },
    { "lowerBinary": "011", "upperBinary": "101", "king wen": 50, "pinyin": "Dǐng", "hanzi": "鼎", "unicode": "䷱" },
    { "lowerBinary": "100", "upperBinary": "100", "king wen": 51, "pinyin": "Zhèn", "hanzi": "震", "unicode": "䷲" },
    { "lowerBinary": "001", "upperBinary": "001", "king wen": 52, "pinyin": "Gèn", "hanzi": "艮", "unicode": "䷳" },
    { "lowerBinary": "001", "upperBinary": "011", "king wen": 53, "pinyin": "Jiàn", "hanzi": "漸", "unicode": "䷴" },
    { "lowerBinary": "110", "upperBinary": "100", "king wen": 54, "pinyin": "Guī Mèi", "hanzi": "歸妹", "unicode": "䷵" },
    { "lowerBinary": "101", "upperBinary": "100", "king wen": 55, "pinyin": "Fēng", "hanzi": "豐", "unicode": "䷶" },
    { "lowerBinary": "001", "upperBinary": "101", "king wen": 56, "pinyin": "Lǚ", "hanzi": "旅", "unicode": "䷷" },
    { "lowerBinary": "011", "upperBinary": "011", "king wen": 57, "pinyin": "Xùn", "hanzi": "巽", "unicode": "䷸" },
    { "lowerBinary": "110", "upperBinary": "110", "king wen": 58, "pinyin": "Duì", "hanzi": "兌", "unicode": "䷹" },
    { "lowerBinary": "010", "upperBinary": "011", "king wen": 59, "pinyin": "Huàn", "hanzi": "渙", "unicode": "䷺" },
    { "lowerBinary": "110", "upperBinary": "010", "king wen": 60, "pinyin": "Jié", "hanzi": "節", "unicode": "䷻" },
    { "lowerBinary": "110", "upperBinary": "011", "king wen": 61, "pinyin": "Zhōng Fú", "hanzi": "中孚", "unicode": "䷼" },
    { "lowerBinary": "001", "upperBinary": "100", "king wen": 62, "pinyin": "Xiǎo Guò", "hanzi": "小過", "unicode": "䷽" },
    { "lowerBinary": "101", "upperBinary": "010", "king wen": 63, "pinyin": "Jì Jì", "hanzi": "既濟", "unicode": "䷾" },
    { "lowerBinary": "010", "upperBinary": "101", "king wen": 64, "pinyin": "Wèi Jì", "hanzi": "未濟", "unicode": "䷿" },
], { ordered: false })
db.hexagram.createIndex({ "lowerBinary": 1, "upperBinary": 1 })
db.hexagram.createIndex({ "king wen": 1 })
