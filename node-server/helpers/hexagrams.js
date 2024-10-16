const binaryToHexagram = { "111111": 1, "000000": 2, "100010": 3, "010001": 4, "111010": 5, "010111": 6, "010000": 7, "000010": 8, "111011": 9, "110111": 10, "111000": 11, "000111": 12, "101111": 13, "111101": 14, "001000": 15, "000100": 16, "100110": 17, "011001": 18, "110000": 19, "000011": 20, "100101": 21, "101001": 22, "000001": 23, "100000": 24, "100111": 25, "111001": 26, "100001": 27, "011110": 28, "010010": 29, "101101": 30, "001110": 31, "011100": 32, "001111": 33, "111100": 34, "000101": 35, "101000": 36, "101011": 37, "110101": 38, "001010": 39, "010100": 40, "110001": 41, "100011": 42, "111110": 43, "011111": 44, "000110": 45, "011000": 46, "010110": 47, "011010": 48, "101110": 49, "011101": 50, "100100": 51, "001001": 52, "001011": 53, "110100": 54, "101100": 55, "001101": 56, "011011": 57, "110110": 58, "010011": 59, "110010": 60, "110011": 61, "001100": 62, "101010": 63, "010101": 64 }


const response400InvalidRequest = { status: 400, data: "Invalid request" };
const response404Hexagram = { status: 404, data: "Hexagram not found, where did it go?" };
const response500ServerError = { status: 500, data: "Server error, please try again later" };


function getHexagramNumber(hexParameter) {
    // if hex parameter is number between 1 and 64, return it
    if (/^([1-9]|[1-5][0-9]|6[0-4])$/.test(hexParameter)) {
        return Number(hexParameter);
    }
    // if hex parameter is 6 digit binary string, return hexagram number
    if (/^[01]{6}$/.test(hexParameter)) {
        return binaryToHexagram[hexParameter];
    }
    return undefined;
}


function isValidHexagramString(hexParameter) {
    if (getHexagramNumber(hexParameter)) {
        return true;
    }
    return false;
}



async function lookupHexagrams(hex1, hex2 = 0, userId = null) {
    let lookup = [getHexagramNumber(hex1), getHexagramNumber(hex2)]
    lookup = lookup.filter(hex => hex);
    // remove duplicates from lookup array
    lookup = lookup.filter((hex, index) => lookup.indexOf(hex) === index);
    if (lookup.length === 0) return response400InvalidRequest;

    let queryDoc = { "_id": { $in: lookup } };
    let orMatch = [{ publicReference: true }];
    if (userId) {
        orMatch.push({ userId: userId });
    }
    let referencesMatchObject = {
        path: 'references',
        select: "titleId userId kingwen columns",
        match: {
            $or: orMatch
        }
    };

    try {
        console.log("attempting to find hexagrams", lookup, referencesMatchObject);
        let hexagrams = await Hexagram.find(queryDoc)
            .populate(referencesMatchObject)
            .lean()
            .exec();
        if (!hexagrams || hexagrams.length === 0) return response404Hexagram;
        console.log("hexagrams", hexagrams);
        // reorder the results if the order doesn't match the query
        if (lookup.length > 1 && hexagrams[0]["_id"] == lookup[1]) {
            hexagrams.push(hexagrams.shift());
        }
        return { status: 200, data: hexagrams };
    }
    catch (err) {
        console.log("Error in lookupHexagrams:", err);
        return response500ServerError;
    }
};



module.exports = {
    binaryToHexagram,
    getHexagramNumber,
    isValidHexagramString,
    lookupHexagrams
}