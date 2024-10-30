const { getHexagramNumber } = require('../helpers/hexagrams');
const { hexagramArray, binaryArray, expectUndefined } = require('./00_helpers_hexagrams_TestConstants');

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
