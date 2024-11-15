import { describe, expect, it } from 'vitest'
import { getMovingLines } from './hexagrams'

describe('getMovingLines', () => {
    it('returns empty array for single hexagram', () => {
        const result = getMovingLines([1]);
        expect(result).toEqual([]);
    });

    it('returns empty array for identical hexagrams', () => {
        // Using hexagram 1 (all solid lines) twice
        // Binary would be 111111, 111111
        const result = getMovingLines([1, 1]);
        expect(result).toEqual([]);
    });

    it('identifies moving lines between different hexagrams', () => {
        // Using hexagrams 1 and 2
        // Hexagram 1 is 111111
        // Hexagram 2 is 000000
        // All lines should be moving
        const result = getMovingLines([1, 2]);
        expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('identifies subset of moving lines', () => {
        // Using hexagrams where only some lines change
        // For example, 111111 to 111000
        // Bottom three lines change
        const result = getMovingLines([1, 11]); // You may need to adjust these numbers
        expect(result.length).toBeGreaterThan(0);
        expect(result.length).toBeLessThan(6);
        result.forEach(lineNum => {
            expect(lineNum).toBeGreaterThanOrEqual(1);
            expect(lineNum).toBeLessThanOrEqual(6);
        });
    });
});