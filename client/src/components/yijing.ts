import { getBinaryFromHexagramNumbers, getHexagramBasicInfo } from '../constants/hexagram.js';

function reformatReferences(references, hexagrams) {
    const binaryStrings = getBinaryFromHexagramNumbers(hexagrams);
    const movingLineIndices = [];

    if (binaryStrings.length > 1) {
        for (let i = 0; i < binaryStrings[0].length; i++) {
            if (binaryStrings[0][i] !== binaryStrings[1][i]) {
                movingLineIndices.push(i + 1);
            }
        }
    }
    const hexagramInfo = getHexagramBasicInfo(hexagrams);
    const sourceGroups = {};
    references.forEach(ref => {
        const sourceKey = JSON.stringify({
            title: ref.titleId.title,
            translator: ref.titleId.translator,
            year: ref.titleId.year
        });
        if (!sourceGroups[sourceKey]) {
            sourceGroups[sourceKey] = {
                titleId: ref.titleId,
                refs: []
            };
        }
        sourceGroups[sourceKey].refs.push(ref);
    });

    const sortedSources = Object.values(sourceGroups).sort((a, b) => {
        if (a.titleId.translator.includes('Legge') && !b.titleId.translator.includes('Legge')) return 1;
        if (!a.titleId.translator.includes('Legge') && b.titleId.translator.includes('Legge')) return -1;
        return 0;
    });

    let results = [];

    sortedSources.forEach(source => {
        const { title, translator, year, columnOrder } = source.titleId;
        let sourceContent = [];

        let headerInfo = [];
        if (title) headerInfo.push(title);
        if (translator) headerInfo.push(`Translated by ${translator}`);
        if (year) headerInfo.push(`(${year})`);
        sourceContent.push(`<h2>${headerInfo.join(' ')}</h2>`);

        hexagrams.forEach((hexNum, index) => {
            const ref = source.refs.find(r => r.kingwen === hexNum);
            if (!ref) return;

            const hexInfo = hexagramInfo.find(h => h.kingwen === hexNum);
            const hexHeader = `<h1>Hexagram ${hexNum}: ${hexInfo.pinyin} ${hexInfo.hanzi} ${hexInfo.unicode}</h1>`;
            sourceContent.push(hexHeader);

            columnOrder.forEach(key => {
                if (!ref.columns[key]) return;

                // Skip line-specific footnotes if they're not about moving lines
                if (key === 'footnote') {
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
                if (!isNaN(key)) {
                    const lineNum = parseInt(key);
                    if (index === 1 && !movingLineIndices.includes(lineNum)) return;
                    if (!movingLineIndices.includes(lineNum)) return;
                }

                let header = !isNaN(key)
                    ? `Line ${key}`
                    : key.charAt(0).toUpperCase() + key.slice(1);

                sourceContent.push(`<h3>${header}</h3><p>${ref.columns[key]}</p>`);
            });
        });

        results.push(sourceContent.join('\n'));
    });
    return results;
}


async function getReference(hexagrams) {
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