import pandas as pd


legge_title_info = {
    "title": "The Sacred Books of China - Volume XVI, Part 2 - The Yî King",
    "year": 1882,
    "author": "Confucius",
    "translator": "James Legge",
    "kingwenField": "kingwen",
    "fieldOrder": ["name", "judgment", "1", "2", "3", "4", "5", "6", "7", "footnote"]
}

data = pd.read_csv("legge.csv", encoding="utf-8")

for column in data.columns:
    if "." in column:
        data.rename(columns={column: column.split(".")[0]}, inplace=True)

data.to_json("legge_reference.json", orient="records")