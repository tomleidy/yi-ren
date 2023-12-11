"""Dictionaries and helper functions for looking up Trigrams"""
from lines import original_to_lookup_values_stationary, original_to_lookup_values_moving


trigram_lines_to_trigram_pinyin = {
    (8, 8, 8): "Qian", (8, 8, 7): "Dui", (8, 7, 8): "Li", (8, 7, 7): "Zhen",
    (7, 8, 8): "Xun", (7, 8, 7): "Kan", (7, 7, 8): "Gen", (7, 7, 7): "Kun"
}

trigram_pinyin_info = {
    "Qian": {"zi": "乾", "gua": "☰", "meaning": "Heaven"},
    "Dui": {"zi": "兌", "gua": "☱", "meaning": "Lake"},
    "Li": {"zi": "兌", "gua": "☲", "meaning": "Fire"},
    "Zhen": {"zi": "震", "gua": "☳", "meaning": "Thunder"},
    "Xun": {"zi": "巽", "gua": "☴", "meaning": "Wind"},
    "Kan": {"zi": "坎", "gua": "☵", "meaning": "Water"},
    "Gen": {"zi": "艮", "gua": "☶", "meaning": "Mountain"},
    "Kun": {"zi": "坤", "gua": "☷", "meaning": "Earth"}
}
# this could be hard coded into the above dictionary, but for now this is faster.
for lines, pinyin in trigram_lines_to_trigram_pinyin.items():
    trigram_pinyin_info[pinyin]["lines"] = lines


def get_trigram_from_lines_stationary(lines: list):
    """Take a list of 3 integers and identify the trigram, default"""
    lines = original_to_lookup_values_stationary(lines)
    return trigram_lines_to_trigram_pinyin[tuple(lines)]


def get_trigram_from_lines_moving(lines: list):
    """Take a list of 3 integers and identify the trigram that the current one is moving to"""
    lines = original_to_lookup_values_moving(lines)
    return trigram_lines_to_trigram_pinyin[tuple(lines)]


if __name__ == "__main__":
    hexagrams = {}
    for lower_key, lower_gua in trigram_lines_to_trigram_pinyin.items():
        print(lower_key, lower_gua)
        for upper_key, upper_gua in trigram_lines_to_trigram_pinyin.items():
            combined_key = lower_key + upper_key
            combined_gua = lower_gua + ", " + upper_gua
            hexagrams[combined_key] = combined_gua
    print(hexagrams)
