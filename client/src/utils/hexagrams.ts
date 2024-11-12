import { getBinaryFromHexagramNumbers } from '../constants/hexagram.js';
import { HexagramLines } from "../types/index.js";

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


export {
    getMovingLines
}