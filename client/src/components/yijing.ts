import { getBinaryFromHexagramNumbers, getHexagramBasicInfo } from '../constants/hexagram.js';
import { HexagramLines, HexagramSingleEntryBasicInfo, YijingTitleObject, YijingEntryArray } from './types.js';


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

interface YijingEntriesGroup {
    titleId: YijingTitleObject;
    refs: YijingEntryArray;
}

interface YijingGroupedEntriesObject {
    [key: string]: YijingEntriesGroup;
}

function sortLeggeFirst(a: YijingEntriesGroup, b: YijingEntriesGroup, leggeLast: boolean = false) {
    if (a.titleId.translator?.includes('Legge')) return leggeLast ? -1 : 1;
    if (b.titleId.translator?.includes('Legge')) return leggeLast ? 1 : -1;

    return 0;
}


//function stripFixedLinesFromLegge() { }

function reformatReferences(yijingEntries: YijingEntryArray, hexagrams: HexagramLines) {
    const movingLineIndices: number[] = getMovingLines(hexagrams);
    const hexagramInfo = getHexagramBasicInfo(hexagrams);
    const yijingEntriesGroupedByTitle: YijingGroupedEntriesObject = {};
    yijingEntries.forEach(ref => {
        const titleObject: YijingTitleObject = ref.titleId;
        const titleKey: string = titleObject.title;

        if (!yijingEntriesGroupedByTitle[titleKey]) {
            yijingEntriesGroupedByTitle[titleKey] = {
                titleId: titleObject,
                refs: []
            };
        }
        yijingEntriesGroupedByTitle[titleKey].refs.push(ref);
    });

    const sortedSources = Object.values(yijingEntriesGroupedByTitle).sort(sortLeggeFirst);
    const results: string[] = [];

    sortedSources.forEach(source => {
        const { title, translator, year, columnOrder } = source.titleId;
        const sourceContent: string[] = [];

        const headerInfo: string[] = [];
        if (title) headerInfo.push(title);
        if (translator) headerInfo.push(`Translated by ${translator}`);
        if (year) headerInfo.push(`(${year})`);
        sourceContent.push(`<h2>${headerInfo.join(' ')}</h2>`);

        hexagrams.forEach((hexNum, index) => {
            const ref = source.refs.find(r => r.kingwen === hexNum);
            if (!ref) return;

            const hexInfo: HexagramSingleEntryBasicInfo = hexagramInfo.find(h => h.kingwen === hexNum)!;
            const hexHeader = `<h1>Hexagram ${hexNum}: ${hexInfo.pinyin} ${hexInfo.hanzi} ${hexInfo.unicode}</h1>`;
            sourceContent.push(hexHeader);

            columnOrder.forEach(key => {
                if (!ref.columns[key]) return;

                // Skip line-specific footnotes if they're not about moving lines
                if (key.length > 500) {
                    const footnoteText = ref.columns[key];
                    // Split footnote into segments (assuming paragraphs are separated by periods followed by whitespace)
                    const segments = footnoteText.split(/\.(?=\s)/);
                    // Filter segments that start with "Line X" where X is not a moving line
                    const filteredSegments = segments.filter(segment => {
                        const trimmed = segment.trim();
                        if (trimmed.startsWith('Line')) {
                            const lineNum = parseInt(trimmed.split(' ')[1]);
                            return movingLineIndices.includes(lineNum);
                        }
                        return true;
                    });
                    if (filteredSegments.length > 0) {
                        sourceContent.push(`<h3>Notes</h3><p>${filteredSegments.join('. ')}.</p>`);
                    }
                    return;
                }

                // Handle regular numbered lines
                if (!isNaN(Number(key))) {
                    const lineNum = parseInt(key);
                    if (index === 1 && !movingLineIndices.includes(lineNum)) return;
                    if (!movingLineIndices.includes(lineNum)) return;
                }

                const header: string = !isNaN(Number(key))
                    ? `Line ${key}`
                    : key.charAt(0).toUpperCase() + key.slice(1);

                sourceContent.push(`<h3>${header}</h3><p>${ref.columns[key]}</p>`);
            });
        });

        results.push(sourceContent.join('\n'));
    });
    return results;
}


async function getReference(hexagrams: number[]) {
    const path = `/reference/${hexagrams.join("/")}`;
    try {

        const response = await fetch(path);
        console.log('response', response)

        const dataJSON = await response.json();
        console.log('dataJSON', dataJSON);
        console.log(typeof dataJSON);
        return reformatReferences(dataJSON, hexagrams);
    }
    catch (error) {
        console.log("getReference error:", error);
    }
}


export { getReference };