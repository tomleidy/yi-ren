const expectUndefined = ["65", "0", "1011011", "10110", "word"]

// redundant copy of binaryToHexagram. It should NEVER change.
const binaryToHexagram = { "111111": 1, "000000": 2, "100010": 3, "010001": 4, "111010": 5, "010111": 6, "010000": 7, "000010": 8, "111011": 9, "110111": 10, "111000": 11, "000111": 12, "101111": 13, "111101": 14, "001000": 15, "000100": 16, "100110": 17, "011001": 18, "110000": 19, "000011": 20, "100101": 21, "101001": 22, "000001": 23, "100000": 24, "100111": 25, "111001": 26, "100001": 27, "011110": 28, "010010": 29, "101101": 30, "001110": 31, "011100": 32, "001111": 33, "111100": 34, "000101": 35, "101000": 36, "101011": 37, "110101": 38, "001010": 39, "010100": 40, "110001": 41, "100011": 42, "111110": 43, "011111": 44, "000110": 45, "011000": 46, "010110": 47, "011010": 48, "101110": 49, "011101": 50, "100100": 51, "001001": 52, "001011": 53, "110100": 54, "101100": 55, "001101": 56, "011011": 57, "110110": 58, "010011": 59, "110010": 60, "110011": 61, "001100": 62, "101010": 63, "010101": 64 }
const hexagramToBinary = Object.fromEntries(Object.entries(binaryToHexagram).map(([key, value]) => [value, key]));
const binaryArray = Object.keys(binaryToHexagram);
const hexagramArray = Object.values(binaryToHexagram);



const hexagramsBasicInfoObj = {
    "1": { "_id": 1, "binary": "111111", "pinyin": "Qián", "hanzi": "乾", "unicode": "䷀" },
    "2": { "_id": 2, "binary": "000000", "pinyin": "Kūn", "hanzi": "坤", "unicode": "䷁" },
    "3": { "_id": 3, "binary": "100010", "pinyin": "Zhūn", "hanzi": "屯", "unicode": "䷂" },
    "4": { "_id": 4, "binary": "010001", "pinyin": "Méng", "hanzi": "蒙", "unicode": "䷃" },
    "5": { "_id": 5, "binary": "111010", "pinyin": "Xū", "hanzi": "需", "unicode": "䷄" },
    "6": { "_id": 6, "binary": "010111", "pinyin": "Sòng", "hanzi": "訟", "unicode": "䷅" },
    "7": { "_id": 7, "binary": "010000", "pinyin": "Shī", "hanzi": "師", "unicode": "䷆" },
    "8": { "_id": 8, "binary": "000010", "pinyin": "Bǐ", "hanzi": "比", "unicode": "䷇" },
    "9": { "_id": 9, "binary": "111011", "pinyin": "Xiǎo Xù", "hanzi": "小畜", "unicode": "䷈" },
    "10": { "_id": 10, "binary": "110111", "pinyin": "Lǚ", "hanzi": "履", "unicode": "䷉" },
    "11": { "_id": 11, "binary": "111000", "pinyin": "Tài", "hanzi": "泰", "unicode": "䷊" },
    "12": { "_id": 12, "binary": "000111", "pinyin": "Pǐ", "hanzi": "否", "unicode": "䷋" },
    "13": { "_id": 13, "binary": "101111", "pinyin": "Tóng Rén", "hanzi": "同人", "unicode": "䷌" },
    "14": { "_id": 14, "binary": "111101", "pinyin": "Dà Yǒu", "hanzi": "大有", "unicode": "䷍" },
    "15": { "_id": 15, "binary": "001000", "pinyin": "Qiān", "hanzi": "謙", "unicode": "䷎" },
    "16": { "_id": 16, "binary": "000100", "pinyin": "Yù", "hanzi": "豫", "unicode": "䷏" },
    "17": { "_id": 17, "binary": "100110", "pinyin": "Suí", "hanzi": "隨", "unicode": "䷐" },
    "18": { "_id": 18, "binary": "011001", "pinyin": "Gŭ", "hanzi": "蠱", "unicode": "䷑" },
    "19": { "_id": 19, "binary": "110000", "pinyin": "Lín", "hanzi": "臨", "unicode": "䷒" },
    "20": { "_id": 20, "binary": "000011", "pinyin": "Guān", "hanzi": "觀", "unicode": "䷓" },
    "21": { "_id": 21, "binary": "100101", "pinyin": "Shì Kè", "hanzi": "噬嗑", "unicode": "䷔" },
    "22": { "_id": 22, "binary": "101001", "pinyin": "Bì", "hanzi": "賁", "unicode": "䷕" },
    "23": { "_id": 23, "binary": "000001", "pinyin": "Bō", "hanzi": "剝", "unicode": "䷖" },
    "24": { "_id": 24, "binary": "100000", "pinyin": "Fù", "hanzi": "復", "unicode": "䷗" },
    "25": { "_id": 25, "binary": "100111", "pinyin": "Wú Wàng", "hanzi": "無妄", "unicode": "䷘" },
    "26": { "_id": 26, "binary": "111001", "pinyin": "Dà Xù", "hanzi": "大畜", "unicode": "䷙" },
    "27": { "_id": 27, "binary": "100001", "pinyin": "Yí", "hanzi": "頤", "unicode": "䷚" },
    "28": { "_id": 28, "binary": "011110", "pinyin": "Dà Guò", "hanzi": "大過", "unicode": "䷛" },
    "29": { "_id": 29, "binary": "010010", "pinyin": "Kǎn", "hanzi": "坎", "unicode": "䷜" },
    "30": { "_id": 30, "binary": "101101", "pinyin": "Lí", "hanzi": "離", "unicode": "䷝" },
    "31": { "_id": 31, "binary": "001110", "pinyin": "Xián", "hanzi": "咸", "unicode": "䷞" },
    "32": { "_id": 32, "binary": "011100", "pinyin": "Héng", "hanzi": "恆", "unicode": "䷟" },
    "33": { "_id": 33, "binary": "001111", "pinyin": "Dùn", "hanzi": "遯", "unicode": "䷠" },
    "34": { "_id": 34, "binary": "111100", "pinyin": "Dà Zhuàng", "hanzi": "大壯", "unicode": "䷡" },
    "35": { "_id": 35, "binary": "000101", "pinyin": "Jìn", "hanzi": "晉", "unicode": "䷢" },
    "36": { "_id": 36, "binary": "101000", "pinyin": "Míng Yí", "hanzi": "明夷", "unicode": "䷣" },
    "37": { "_id": 37, "binary": "101011", "pinyin": "Jiā Rén", "hanzi": "家人", "unicode": "䷤" },
    "38": { "_id": 38, "binary": "110101", "pinyin": "Kuí", "hanzi": "睽", "unicode": "䷥" },
    "39": { "_id": 39, "binary": "001010", "pinyin": "Jiǎn", "hanzi": "蹇", "unicode": "䷦" },
    "40": { "_id": 40, "binary": "010100", "pinyin": "Xiè", "hanzi": "解", "unicode": "䷧" },
    "41": { "_id": 41, "binary": "110001", "pinyin": "Sǔn", "hanzi": "損", "unicode": "䷨" },
    "42": { "_id": 42, "binary": "100011", "pinyin": "Yì", "hanzi": "益", "unicode": "䷩" },
    "43": { "_id": 43, "binary": "111110", "pinyin": "Guài", "hanzi": "夬", "unicode": "䷪" },
    "44": { "_id": 44, "binary": "011111", "pinyin": "Gòu", "hanzi": "姤", "unicode": "䷫" },
    "45": { "_id": 45, "binary": "000110", "pinyin": "Cuì", "hanzi": "萃", "unicode": "䷬" },
    "46": { "_id": 46, "binary": "011000", "pinyin": "Shēng", "hanzi": "升", "unicode": "䷭" },
    "47": { "_id": 47, "binary": "010110", "pinyin": "Kùn", "hanzi": "困", "unicode": "䷮" },
    "48": { "_id": 48, "binary": "011010", "pinyin": "Jǐng", "hanzi": "井", "unicode": "䷯" },
    "49": { "_id": 49, "binary": "101110", "pinyin": "Gé", "hanzi": "革", "unicode": "䷰" },
    "50": { "_id": 50, "binary": "011101", "pinyin": "Dǐng", "hanzi": "鼎", "unicode": "䷱" },
    "51": { "_id": 51, "binary": "100100", "pinyin": "Zhèn", "hanzi": "震", "unicode": "䷲" },
    "52": { "_id": 52, "binary": "001001", "pinyin": "Gèn", "hanzi": "艮", "unicode": "䷳" },
    "53": { "_id": 53, "binary": "001011", "pinyin": "Jiàn", "hanzi": "漸", "unicode": "䷴" },
    "54": { "_id": 54, "binary": "110100", "pinyin": "Guī Mèi", "hanzi": "歸妹", "unicode": "䷵" },
    "55": { "_id": 55, "binary": "101100", "pinyin": "Fēng", "hanzi": "豐", "unicode": "䷶" },
    "56": { "_id": 56, "binary": "001101", "pinyin": "Lǚ", "hanzi": "旅", "unicode": "䷷" },
    "57": { "_id": 57, "binary": "011011", "pinyin": "Xùn", "hanzi": "巽", "unicode": "䷸" },
    "58": { "_id": 58, "binary": "110110", "pinyin": "Duì", "hanzi": "兌", "unicode": "䷹" },
    "59": { "_id": 59, "binary": "010011", "pinyin": "Huàn", "hanzi": "渙", "unicode": "䷺" },
    "60": { "_id": 60, "binary": "110010", "pinyin": "Jié", "hanzi": "節", "unicode": "䷻" },
    "61": { "_id": 61, "binary": "110011", "pinyin": "Zhōng Fú", "hanzi": "中孚", "unicode": "䷼" },
    "62": { "_id": 62, "binary": "001100", "pinyin": "Xiǎo Guò", "hanzi": "小過", "unicode": "䷽" },
    "63": { "_id": 63, "binary": "101010", "pinyin": "Jì Jì", "hanzi": "既濟", "unicode": "䷾" },
    "64": { "_id": 64, "binary": "010101", "pinyin": "Wèi Jì", "hanzi": "未濟", "unicode": "䷿" }
}
const hexagram1Reference = {
    _id: '670572b7601ebb7eba6e878d',
    userId: null,
    titleId: '67056cd6421e4c23e1be74ce',
    kingwen: 1,
    deletedAt: null,
    deletedPermanent: false,
    columns: {
        '1': 'In the first (or lowest) line, undivided, (we see its subject as) the dragon lying hid (in the deep). It is not the time for active doing.',
        '2': 'In the second line, undivided, (we see its subject as) the dragon appearing in the field. It will be advantageous to meet with the great man.',
        '3': 'In the third line, undivided, (we see its subject as) the superior man active and vigilant all the day, and in the evening still careful and apprehensive. (The position is) dangerous, but there will be no mistake.',
        '4': 'In the fourth line, undivided, (we see its subject as the dragon looking) as if he were leaping up, but still in the deep. There will be no mistake.',
        '5': 'In the fifth line, undivided, (we see its subject as) the dragon on the wing in the sky. It will be advantageous to meet with the great man.',
        '6': 'In the sixth (or topmost) line, undivided, (we see its subject as) the dragon exceeding the proper limits. There will be occasion for repentance.',
        '7': '(The lines of this hexagram are all strong and undivided, as appears from) the use of the number nine. If the host of dragons (thus) appearing were to divest themselves of their heads, there would be good fortune.',
        name: 'Khien',
        judgment: 'Khien (represents) what is great and originating, penetrating, advantageous, correct and firm.',
        footnote: 'The Text under each hexagram consists of one paragraph by king Wǎn, explaining the figure as a whole, and of six (in the case of hexagrams 1 and 2, of seven) paragraphs by the duke of Kâu, explaining the individual lines. The explanatory notices introduced above to this effect will not be repeated. A double space will be used to mark off the portion of king Wǎn from that of his son.\n' + 'Each hexagram consists of two of the trigrams of Fû-hsî, the lower being called ‘the inner,’ and the one above ‘the outer.’ The lines, however, are numbered from one to six, commencing with the lowest. ‘To denote the number of it and of the sixth line, the terms for ‘commencing’ and ‘topmost’ are used. The intermediate lines are simply ‘second,’ ‘third, &c. As the lines must be either whole or divided, technically called strong and weak, yang and yin, this distinction is indicated by the application to them of the numbers nine and six. All whole lines are nine, all divided lines, six.\n' + 'Two explanations have been proposed of this application of these numbers. The Khien trigram, it is said, contains 3 strokes (☰), and the Khwian 6 (☷). But the yang contains the yin in itself, and its representative number will be 3+6=9, while the yin, not containing the yang, will only have its own number or 6. This explanation, entirely arbitrary, is now deservedly abandoned. The other is based on the use of the ‘four Hsiang,’ or emblematic figures (⚌ the great or old yang, ⚍ the young yang, ⚏ the old yin, and ⚎ the young yin). To these are assigned (by what process is unimportant for our present purpose) the numbers 9, 8, 7, 6. They were ‘the old yang, represented by 9, and ‘the old yin,’ represented by 6, that, in the manipulation of the stalks to form new diagrams, determined the changes of figure; and so 9 and 6 came to be used as the names of a yang line and a yin line respectively. This explanation is now universally acquiesced in. The nomenclature of first nine, nine two, &c., or first six, six two, &c., however, is merely a jargon; and I have preferred to use, instead of it, in the translation, in order: to describe the lines, the names ‘undivided’ and ‘divided.’\n' +
            "I. Does king Wǎn ascribe four attributes here to Khien, or only two? According to Appendix IV, always by Chinese writers assigned to Confucius, he assigns four, corresponding to the principles of benevolence, righteousness, propriety, and knowledge in man’s nature. Kû Hsî held that he assigned only two, and that we should translate, ‘greatly penetrating,' and ‘requires to be correct and firm,’ two responses in divination. Up and down throughout the Text of the 64 hexagrams, we often find the characters thus coupled together. Both interpretations are possible. I have followed what is accepted as the view of Confucius. It would take pages to give a tithe of what has been written in justification of it, and to reconcile it with the other.\n" +
            '‘The dragon’ is the symbol employed by the duke of Kâu to represent ‘the superior man’ and especially ‘the great man,’ exhibiting the virtues or attributes characteristic of heaven. The creature’s proper home is 1n the water, but it can disport itself on the land, and also fly and soar aloft. It has been from the earliest time the emblem with the Chinese of the highest dignity and wisdom, of sovereignty and sagehood, the combination of which constitutes ‘the great man.’ One emblem runs through the lines of many of the hexagrams as here.\n' +
            'But the dragon appears in the sixth line as going beyond the proper limits. The ruling-sage has gone through all the sphere in which he is called on to display his attributes; it is time for him to relax. The line should not be always pulled tight; the bow should not be always kept drawn. The unchanging use of force will give occasion for repentance. The moral meaning found in the hme is that ‘the high shall be abased.’\n' +
            "The meaning given to the supernumerary paragraph is the opposite of that of paragraph 6. The ‘host of dragons without their heads’ would give us the next hexagram, or Khwǎn, made up of six divided lines. Force would have given place to submission, and haughtiness to humility; and the result would be good fortune. Such at least is the interpretation of the paragraph given in a narrative of the Zo-Kwan under B.C. 513. For further explanation of the duke of Kâu's meaning, see Appendixes II and IV."
    }
}
const hexagram2Reference = {
    _id: '670572b7601ebb7eba6e878e',
    userId: null,
    titleId: '67056cd6421e4c23e1be74ce',
    kingwen: 2,
    deletedAt: null,
    deletedPermanent: false,
    columns: {
        '1': 'In the first line, divided, (we see its subject) treading on hoarfrost. The strong ice will come (by and by).',
        '2': 'The second line, divided, (shows the attribute of) being straight, square, and great. (Its operation), without repeated efforts, will be in every respect advantageous.',
        '3': 'The third line, divided, (shows its subject) keeping his excellence under restraint, but firmly maintaining it. If he should have occasion to engage in the king’s service, though he will not claim the success (for himself), he will bring affairs to a good issue.',
        '4': 'The fourth line, divided, (shows the symbol of) a sack tied up. There will be no ground for blame or for praise.',
        '5': 'The fifth line, divided, (shows) the yellow lower garment. There will be great good fortune.',
        '6': 'The sixth line, divided, (shows) dragons fighting in the wild. Their blood is purple and yellow.',
        '7': '(The lines of this hexagram are all weak and divided, as appears from) the use of the number six. If those (who are thus represented) be perpetually correct and firm, advantage will arise.',
        name: 'Khwǎn',
        judgment: 'Khwǎn (represents) what is great and originating, penetrating, advantageous, correct and having the firmness of a mare. When the superior man (here intended) has to make any movement, if he take the initiative, he will go astray; if he follow, he will find his (proper) lord. The advantageousness will be seen in his getting friends in the south-west, and losing friends in the north-east. If he rest in correctness and firmness, there will be good fortune.',
        footnote: 'II. The same attributes are here ascribed to Khwǎn, as in the former hexagram to Khien;—but with a difference. The figure, made up of six divided lines, expresses the ideal of subordination and docility. The superior man, represented by it, must not take the initiative, and by following he will find his lord,—the subject, that is of Khien. Again, the correctness and firmness is defined to be that of ‘a mare, ‘docile and strong,’ but a creature for the service of man. That it is not the sex of the animal which the writer has chiefly in mind is plain from the immediate mention of the superior man, and his lord.\n' +
            'That superior man will seek to bring his friends along with himself to serve his ruler. But according to the arrangement of the trigrams by king Wân, the place of Khwǎn is in the south-west, while the opposite quarter is occupied by the yang trigram Kǎn, as in Figure 2, Plate III. All that this portion of the Thwan says is an instruction to the subject of the hexagram to seek for others of the same principles and tendencies with himself to serve their common lord. But in quietness and firmness will be his strength.\n' +
            'The symbolism of the lines is various. Paragraph 2 presents to us the earth itself, according to the Chinese conception of it, as a great cube. ‘To keep his excellence under restraint, as in paragraph 3, is the part of a minister or officer, seeking not his own glory, but that of his ruler. Paragraph 4 shows its subject exercising a still greater restraint on himself than in paragraph 3. There is an interpretation of the symbolism of paragraph 5 in a narrative of the 30 Kwan, under the 12th year of duke Khâo, B.c. 530. ‘Yellow’ is one of the five ‘correct’ colours, and the colour of the earth. ‘The lower garment’ is a symbol of humility. The fifth line is the seat of honour. If its occupant possess the\n' +
            'qualities indicated, he will be greatly fortunate.\n' +
            'See the note on the sixth line of hexagram 1. What is there said to be ‘beyond the proper limits’ takes place here ‘in the wild.’ The humble subject of the divided line is transformed into a dragon, and fights with the true dragon, the subject of the undivided line. They fight and bleed, and their blood is of the colour proper to heaven or the sky, and the colour proper to the earth. Paragraph 7 supposes that the hexagram Khwǎn should become changed into Khien;—the result of which would be good.'
    }, __v: 0, publicReference: true
}


// const hexagramToBinary = Object.fromEntries(Object.entries(binaryToHexagram).map(([key, value]) => [value, key]));
// const binaryArray = Object.keys(binaryToHexagram);
// const hexagramArray = Object.values(binaryToHexagram);


module.exports = {
    hexagramsBasicInfoObj,
    hexagram1Reference,
    hexagram2Reference,
    expectUndefined,
    hexagramToBinary,
    binaryArray,
    hexagramArray
}