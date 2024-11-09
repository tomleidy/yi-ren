function transformReferences(queryResponse) {
    return queryResponse.reduce((acc, entry) => {
        if (!acc.some(item => item.title.title === entry.titleId.title)) {
            // Destructure titleId and omit kingwenField
            const { kingwenField, ...titleInfo } = entry.titleId;
            acc.push({
                title: {
                    ...titleInfo,
                    publicReference: entry.publicReference,
                    deletedAt: entry.deletedAt,
                    deletedPermanent: entry.deletedPermanent
                }
            });
        }

        const titleObj = acc.find(item => item.title.title === entry.titleId.title);
        titleObj[entry.kingwen] = entry.columns;

        return acc;
    }, []);
}

module.exports = { transformReferences };