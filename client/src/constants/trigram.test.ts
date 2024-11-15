import { describe, expect, it } from 'vitest'
import trigrams from './trigram'

describe('trigram constants', () => {
    it('maps binary to correct trigram numbers', () => {
        expect(trigrams.binaryToTrigram['111']).toBe(1);  // Heaven
        expect(trigrams.binaryToTrigram['000']).toBe(8);  // Earth
    });

    it('provides correct basic info for all trigrams', () => {
        expect(trigrams.trigramsBasicInfo[1].english).toBe('Heaven');
        expect(trigrams.trigramsBasicInfo[8].english).toBe('Earth');

        // Test that all trigrams have complete info
        Object.values(trigrams.trigramsBasicInfo).forEach(trigram => {
            expect(trigram.fuxi).toBeTruthy();
            expect(trigram.pinyin).toBeTruthy();
            expect(trigram.hanzi).toBeTruthy();
            expect(trigram.unicode).toBeTruthy();
            expect(trigram.english).toBeTruthy();
        });
    });

    it('has matching binary and trigram mappings', () => {
        // Every binary should map to a trigram and vice versa
        Object.entries(trigrams.binaryToTrigram).forEach(([binary, number]) => {
            expect(trigrams.trigramToBinary[number]).toBe(binary);
        });
    });

    it('has all 8 trigrams', () => {
        expect(Object.keys(trigrams.trigramsBasicInfo)).toHaveLength(8);
    });
});