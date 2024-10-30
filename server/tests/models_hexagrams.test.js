const mockingoose = require('mockingoose');
const { Hexagram } = require('../models/hexagram');
const { hexagramsBasicInfoObj, hexagramToBinary } = require("./00_helpers_hexagrams_TestConstants");


describe('test Hexagram model:', () => {
    for (let i = 1; i <= 64; i++) {
        test(`Hexagram model (_id: ${i}) should return binary ${hexagramToBinary[i]}`, async () => {
            const _doc = hexagramsBasicInfoObj[String(i)]

            mockingoose(Hexagram).toReturn(_doc, 'findOne');
            try {
                const result = await Hexagram.findOne({ _id: i })
                expect(result).toBeDefined();
                expect(result).toBeDefined();
                expect(result._id).toBe(i);
                expect(result.binary).toBe(hexagramToBinary[i]);
                expect(result.pinyin).toBeDefined();
                expect(result.hanzi).toBeDefined();
                expect(result.unicode).toBeDefined();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
})
