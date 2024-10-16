const { lookupHexagrams } = require('../helpers/hexagrams');
const { hexagramsBasicInfoObj } = require("./00_helpers_hexagrams_TestConstants");
const mockingoose = require("mockingoose");
const { Hexagram } = require("../models/hexagram");


describe("test lookupHexagrams:", () => {
    test("lookupHexagrams should return hexagrams in order requested", async () => {
        let _result = {
            status: 200,
            data: [hexagramsBasicInfoObj['2'], hexagramsBasicInfoObj['1']]
        }
        mockingoose(Hexagram).toReturn(_result, 'find');
        try {
            const result = await lookupHexagrams(2, 1)
            expect(result.status).toBe(200);
            expect(result.data[0]._id).toBe(2);
            expect(result.data[1]._id).toBe(1);
        } catch (err) {
            console.log(err);
        }
    }
    );


    test("lookupHexagrams should not return hexagram if <1 ", async () => {
        mockingoose(Hexagram).toReturn({ status: 400, data: "Invalid request" }, 'find');
        try {
            const result = await lookupHexagrams(0)
            expect(result.status).toEqual(400);
        } catch (err) {
            console.log(err);
        }
    });
    test("lookupHexagrams should not return hexagrams if >64 ", async () => {
        mockingoose(Hexagram).toReturn({ status: 400, data: "Invalid request" }, 'find');
        try {
            const result = await lookupHexagrams(65)
            expect(result.status).toEqual(400);
        } catch (err) {
            console.log(err);
        }
    });

    test("lookupHexagrams should not return hexagrams if neither are 1-64", async () => {
        mockingoose(Hexagram).toReturn({ status: 400, data: "Invalid request" }, 'find');
        try {
            const result = await lookupHexagrams(0, 65)
            expect(result.status).toEqual(400);
        } catch (err) {
            console.log(err);
        }
    });

});