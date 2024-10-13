const hexagrams = require('./hexagrams');
const { getHexagramNumber, isValidHexagramString } = hexagrams;
const mockingoose = require('mockingoose');
const { Hexagram } = require('../models/hexagram');
const hexagramJSON = require('./hexagrams.test.json');

// redundant copy of binaryToHexagram. It should NEVER change.
const binaryToHexagram = { "111111": 1, "000000": 2, "100010": 3, "010001": 4, "111010": 5, "010111": 6, "010000": 7, "000010": 8, "111011": 9, "110111": 10, "111000": 11, "000111": 12, "101111": 13, "111101": 14, "001000": 15, "000100": 16, "100110": 17, "011001": 18, "110000": 19, "000011": 20, "100101": 21, "101001": 22, "000001": 23, "100000": 24, "100111": 25, "111001": 26, "100001": 27, "011110": 28, "010010": 29, "101101": 30, "001110": 31, "011100": 32, "001111": 33, "111100": 34, "000101": 35, "101000": 36, "101011": 37, "110101": 38, "001010": 39, "010100": 40, "110001": 41, "100011": 42, "111110": 43, "011111": 44, "000110": 45, "011000": 46, "010110": 47, "011010": 48, "101110": 49, "011101": 50, "100100": 51, "001001": 52, "001011": 53, "110100": 54, "101100": 55, "001101": 56, "011011": 57, "110110": 58, "010011": 59, "110010": 60, "110011": 61, "001100": 62, "101010": 63, "010101": 64 }
const hexagramToBinary = Object.fromEntries(Object.entries(binaryToHexagram).map(([key, value]) => [value, key]));
const binaryArray = Object.keys(binaryToHexagram);
const hexagramArray = Object.values(binaryToHexagram);
const expectUndefined = ["65", "0", "1011011", "10110", "word"]



describe('test Hexagram model:', () => {
    for (let i = 1; i <= 64; i++) {
        test(`Hexagram model (_id: ${i}) should return binary ${hexagramToBinary[i]}`, () => {
            const _doc = hexagramJSON[String(i)]

            mockingoose(Hexagram).toReturn(_doc, 'findOne');
            return Hexagram.findOne({ _id: i }).then(doc => {
                expect(doc._id).toBe(i);
                expect(doc.binary).toBe(hexagramToBinary[i]);
                expect(doc.pinyin).toBeDefined();
                expect(doc.hanzi).toBeDefined();
                expect(doc.unicode).toBeDefined();
            })

        });
    }
})


describe("test conversion of hexagram numbers as strings to numbers:", () => {
    for (let i = 1; i <= 64; i++) {
        test(`${i} should be ${i}`, () => {
            expect(getHexagramNumber(`${i}`)).toBe(i);
        });
    };
});


describe("test conversion of binary strings to hexagram numbers:", () => {
    for (let num in binaryArray) {
        test(`${binaryArray[num]} should be ${hexagramArray[num]}`, () => {
            expect(getHexagramNumber(binaryArray[num])).toBe(hexagramArray[num]);
        });
    };
})



describe("test conversion of invalid hexagram strings to undefined:", () => {
    for (let incorrect of expectUndefined) {
        test(`${incorrect} should be undefined`, () => {
            expect(getHexagramNumber(incorrect)).toBeUndefined();
        });
    }
});

describe("test isValidHexagramString:", () => {
    for (let bin of binaryArray) {
        test(`${bin} should be true`, () => {
            expect(isValidHexagramString(bin)).toBe(true);
        });

    }
    for (let hex of hexagramArray) {
        test(`${hex} (string) should be true`, () => {
            expect(isValidHexagramString(`${hex}`)).toBe(true);
        });
    }
    for (let incorrect of expectUndefined) {
        test(`${incorrect} should be false`, () => {
            expect(isValidHexagramString(incorrect)).toBe(false);
        });
    }
});