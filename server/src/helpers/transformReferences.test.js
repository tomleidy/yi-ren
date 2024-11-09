const { transformReferences } = require('./transformReferences');


const goalResponse = [{
    title: {
        "userId": "67054ed73982072ae05e7bb4",
        "title": "The Sacred Books of China - Volume XVI, Part 2 - The Yî King",
        "author": "Confucius",
        "translator": "James Legge",
        "year": 1882,
        "columnOrder": ["name", "judgment", "1", "2", "3", "4", "5", "6", "7", "footnote"],
        "deletedAt": null,
        "deletedPermanent": false,
        publicReference: true,
    },
    1: {
        "1": "line 1 text",
        "2": "line 2 text",
        "3": "line 3 text",
        "4": "line 4 text",
        "5": "line 5 text",
        "6": "line 6 text",
        "7": "line 7 text",
        "name": "Khien",
        "judgment": "judgment text",
        "footnote": "footnote text"
    },
    11: {
        "1": "line 1 text",
        "2": "line 2 text",
        "3": "line 3 text",
        "4": "line 4 text",
        "5": "line 5 text",
        "6": "line 6 text",
        "7": null,
        "name": "Thâi",
        "judgment": "judgment text",
        "footnote": "footnote text"
    }
}]
const queryResponse = [{
    "userId": null,
    "titleId": {
        "userId": "67054ed73982072ae05e7bb4",
        "title": "The Sacred Books of China - Volume XVI, Part 2 - The Yî King",
        "author": "Confucius",
        "translator": "James Legge",
        "year": 1882,
        "kingwenField": "kingwen",
        "columnOrder": ["name", "judgment", "1", "2", "3", "4", "5", "6", "7", "footnote"]
    },
    "kingwen": 1, "deletedAt": null, "deletedPermanent": false,
    "columns": {
        "1": "line 1 text",
        "2": "line 2 text",
        "3": "line 3 text",
        "4": "line 4 text",
        "5": "line 5 text",
        "6": "line 6 text",
        "7": "line 7 text",
        "name": "Khien",
        "judgment": "judgment text",
        "footnote": "footnote text"
    },
    "publicReference": true
},
{
    "userId": null,
    "titleId": {
        "userId": "67054ed73982072ae05e7bb4",
        "title": "The Sacred Books of China - Volume XVI, Part 2 - The Yî King",
        "author": "Confucius",
        "translator": "James Legge",
        "year": 1882,
        "kingwenField": "kingwen",
        "columnOrder": ["name", "judgment", "1", "2", "3", "4", "5", "6", "7", "footnote"]
    },
    "kingwen": 11,
    "deletedAt": null,
    "deletedPermanent": false,
    "columns": {
        "1": "line 1 text",
        "2": "line 2 text",
        "3": "line 3 text",
        "4": "line 4 text",
        "5": "line 5 text",
        "6": "line 6 text",
        "7": null, "name": "Thâi",
        "judgment": "judgment text",
        "footnote": "footnote text"
    },
    "publicReference": true
}];




describe('transformReferences', () => {
    it('should transform query response to the expected format', () => {
        const result = transformReferences(queryResponse);
        expect(result).toEqual(goalResponse);
    });

    it('should handle empty input', () => {
        const result = transformReferences([]);
        expect(result).toEqual([]);
    });

    it('should handle multiple titles', () => {
        const multiTitleQuery = [
            ...queryResponse,
            {
                ...queryResponse[0],
                titleId: {
                    ...queryResponse[0].titleId,
                    title: "Different Title"
                },
                kingwen: 1
            }
        ];

        const result = transformReferences(multiTitleQuery);
        expect(result).toHaveLength(2);
        expect(result[0].title.title).not.toBe(result[1].title.title);
    });
});