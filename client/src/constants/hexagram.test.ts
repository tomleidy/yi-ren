import { describe, expect, it } from 'vitest'
import {
    getHexagramFromValues,
    getHexagramBasicInfo,
    getBinaryFromHexagramNumbers,
    getHexagramsInfoFromHexArray
} from './hexagram'

describe('getHexagramFromValues', () => {
    it('converts static hexagram (all 7s) to single number', () => {
        const values = [7, 7, 7, 7, 7, 7];  // All yang lines, no changes
        const result = getHexagramFromValues(values);
        expect(result).toHaveLength(1);
        expect(result[0]).toBe(1);  // Should be hexagram 1 (Heaven)
    });

    it('converts static hexagram (all 8s) to single number', () => {
        const values = [8, 8, 8, 8, 8, 8];  // All yin lines, no changes
        const result = getHexagramFromValues(values);
        expect(result).toHaveLength(1);
        expect(result[0]).toBe(2);  // Should be hexagram 2 (Earth)
    });

    it('handles moving lines correctly', () => {
        const values = [6, 7, 7, 7, 7, 7];  // One moving yin line at bottom
        const result = getHexagramFromValues(values);
        expect(result).toHaveLength(2);  // Should get two hexagrams
        expect(result).toContain(1);     // One hexagram should be 1
        expect(result).toContain(44);    // Other should be 44 (Coming to Meet)
    });
});

describe('getHexagramBasicInfo', () => {
    it('returns correct info for hexagram 1', () => {
        const result = getHexagramBasicInfo([1]);
        expect(result[0]).toEqual({
            kingwen: 1,
            pinyin: "Qián",
            hanzi: "乾",
            unicode: "䷀"
        });
    });

    it('returns correct info for multiple hexagrams', () => {
        const result = getHexagramBasicInfo([1, 2]);
        expect(result).toHaveLength(2);
        expect(result[0].kingwen).toBe(1);
        expect(result[1].kingwen).toBe(2);
    });

    it('handles all 64 hexagrams', () => {
        const allHexagrams = Array.from({ length: 64 }, (_, i) => i + 1);
        const result = getHexagramBasicInfo(allHexagrams);
        expect(result).toHaveLength(64);
        result.forEach((info, idx) => {
            expect(info.kingwen).toBe(idx + 1);
            expect(info.unicode).toBeTruthy();
            expect(info.hanzi).toBeTruthy();
            expect(info.pinyin).toBeTruthy();
        });
    });
});

describe('getBinaryFromHexagramNumbers', () => {
    it('converts hexagram 1 to correct binary', () => {
        const result = getBinaryFromHexagramNumbers([1]);
        expect(result[0]).toBe('111111');
    });

    it('converts hexagram 2 to correct binary', () => {
        const result = getBinaryFromHexagramNumbers([2]);
        expect(result[0]).toBe('000000');
    });

    it('handles multiple hexagrams', () => {
        const result = getBinaryFromHexagramNumbers([1, 2]);
        expect(result).toEqual(['111111', '000000']);
    });

    it('converts all hexagrams to valid binary strings', () => {
        const allHexagrams = Array.from({ length: 64 }, (_, i) => i + 1);
        const result = getBinaryFromHexagramNumbers(allHexagrams);

        expect(result).toHaveLength(64);
        result.forEach(binary => {
            expect(binary).toMatch(/^[01]{6}$/);
        });
    });
});

describe('getHexagramsInfoFromHexArray', () => {
    it('returns info for single hexagram', () => {
        const result = getHexagramsInfoFromHexArray([1]);
        expect(result).toHaveLength(1);
        expect(result[0].kingwen).toBe(1);
    });

    it('returns info for multiple hexagrams', () => {
        const result = getHexagramsInfoFromHexArray([1, 2]);
        expect(result).toHaveLength(2);
        expect(result[0].kingwen).toBe(1);
        expect(result[1].kingwen).toBe(2);
    });
});