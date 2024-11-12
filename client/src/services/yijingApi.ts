import { YijingSourceArray } from '../types/index';



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