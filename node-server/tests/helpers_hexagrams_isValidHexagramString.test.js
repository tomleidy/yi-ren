const { isValidHexagramString } = require('../helpers/hexagrams');
const { hexagramArray, expectUndefined, binaryArray } = require('./00_helpers_hexagrams_TestConstants');

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
