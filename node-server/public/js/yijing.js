
function reformatReference(hexagrams, references) {
    let titleInfo = references[0].titleId;
    let columnOrder = titleInfo.columnOrder;
    if (hexagrams.length === 1) {
        return {
            title: titleInfo.title,
            content: references[0].content
        }
    }
}


async function getReference(hexagrams) {
    const path = `/reference/${hexagrams.join("/")}`;
    try {

        const response = await fetch(path);
        console.log('response', response)

        const dataJSON = await response.json();
        console.log('dataJSON', dataJSON);
        if (dataJSON.status === 200) {
            return dataJSON.data;
        }
    }
    catch (error) {
        console.log("getReference error:", error);
    }
}


export { getReference };