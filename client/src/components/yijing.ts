import { getBinaryFromHexagramNumbers } from '../constants/hexagram.js';
import { HexagramLines, YijingSourceArray } from './types.js';


function getMovingLines(hexagrams: HexagramLines) {
    const binaryStrings = getBinaryFromHexagramNumbers(hexagrams);
    const movingLineIndices: number[] = [];
    if (binaryStrings.length > 1) {
        for (let i = 0; i < binaryStrings[0].length; i++) {
            if (binaryStrings[0][i] !== binaryStrings[1][i]) {
                movingLineIndices.push(i + 1);
            }
        }
    }
    return movingLineIndices
}

async function queryYijingTextDbForHexagrams(hexagrams: number[]) {
    const path = `/reference/${hexagrams.join("/")}`;
    try {
        const response = await fetch(path);
        const dataJSON: YijingSourceArray = await response.json();
        return dataJSON;
    }
    catch (error) {
        console.log("getReference error:", error);
    }
}


export { queryYijingTextDbForHexagrams };