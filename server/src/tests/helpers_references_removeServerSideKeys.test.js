const { removeServerSideKeys } = require("../helpers/references")
const { forbiddenKeys } = require("./00_helpers_references_testConstants")


describe("test removeServerSideKeys for any:", () => {
    for (let key of forbiddenKeys) {
        let _doc = {
            name: "test",
            [key]: "any value",
            arr: [{ [key]: "some other value" }]
        };
        test(`removeServerSideKeys() should remove keys named ${key} from an object`, () => {
            let expected = JSON.stringify({ name: "test", arr: [{}] });
            let result = JSON.stringify(removeServerSideKeys(_doc));
            expect(result).toBe(expected);
        })
    }
});
