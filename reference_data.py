"""Dictionaries for trigram and hexagram lookups"""

lines_to_hexagram_number = {
    (8, 8, 8, 8, 8, 8): 1, (8, 8, 8, 8, 8, 7): 43, (8, 8, 8, 8, 7, 8): 14, (8, 8, 8, 8, 7, 7): 34,
    (8, 8, 8, 7, 8, 8): 9, (8, 8, 8, 7, 8, 7): 5, (8, 8, 8, 7, 7, 8): 26, (8, 8, 8, 7, 7, 7): 11,
    (8, 8, 7, 8, 8, 8): 10, (8, 8, 7, 8, 8, 7): 58, (8, 8, 7, 8, 7, 8): 38, (8, 8, 7, 8, 7, 7): 54,
    (8, 8, 7, 7, 8, 8): 61, (8, 8, 7, 7, 8, 7): 60, (8, 8, 7, 7, 7, 8): 41, (8, 8, 7, 7, 7, 7): 19,
    (8, 7, 8, 8, 8, 8): 13, (8, 7, 8, 8, 8, 7): 49, (8, 7, 8, 8, 7, 8): 30, (8, 7, 8, 8, 7, 7): 55,
    (8, 7, 8, 7, 8, 8): 37, (8, 7, 8, 7, 8, 7): 63, (8, 7, 8, 7, 7, 8): 22, (8, 7, 8, 7, 7, 7): 36,
    (8, 7, 7, 8, 8, 8): 25, (8, 7, 7, 8, 8, 7): 17, (8, 7, 7, 8, 7, 8): 21, (8, 7, 7, 8, 7, 7): 51,
    (8, 7, 7, 7, 8, 8): 42, (8, 7, 7, 7, 8, 7): 3, (8, 7, 7, 7, 7, 8): 27, (8, 7, 7, 7, 7, 7): 24,
    (7, 8, 8, 8, 8, 8): 44, (7, 8, 8, 8, 8, 7): 28, (7, 8, 8, 8, 7, 8): 50, (7, 8, 8, 8, 7, 7): 32,
    (7, 8, 8, 7, 8, 8): 57, (7, 8, 8, 7, 8, 7): 48, (7, 8, 8, 7, 7, 8): 18, (7, 8, 8, 7, 7, 7): 46,
    (7, 8, 7, 8, 8, 8): 6, (7, 8, 7, 8, 8, 7): 47, (7, 8, 7, 8, 7, 8): 64, (7, 8, 7, 8, 7, 7): 40,
    (7, 8, 7, 7, 8, 8): 59, (7, 8, 7, 7, 8, 7): 29, (7, 8, 7, 7, 7, 8): 4, (7, 8, 7, 7, 7, 7): 7,
    (7, 7, 8, 7, 8, 8): 53, (7, 7, 8, 7, 8, 7): 39, (7, 7, 8, 7, 7, 8): 52, (7, 7, 8, 7, 7, 7): 15,
    (7, 7, 8, 8, 8, 8): 33, (7, 7, 8, 8, 8, 7): 31, (7, 7, 8, 8, 7, 8): 56, (7, 7, 8, 8, 7, 7): 62,
    (7, 7, 7, 8, 8, 8): 12, (7, 7, 7, 8, 8, 7): 45, (7, 7, 7, 8, 7, 8): 35, (7, 7, 7, 8, 7, 7): 16,
    (7, 7, 7, 7, 8, 8): 20, (7, 7, 7, 7, 8, 7): 8, (7, 7, 7, 7, 7, 8): 23, (7, 7, 7, 7, 7, 7): 2
}
# Reverse the above
hexagram_number_to_lines = {hexagram: lines for lines,
                            hexagram in lines_to_hexagram_number.items()}


trigram_pair_to_hexagram_number = {
    ('Dui', 'Dui'): 58, ('Dui', 'Gen'): 41, ('Dui', 'Kan'): 60, ('Dui', 'Kun'): 19,
    ('Dui', 'Li'): 38, ('Dui', 'Qian'): 10, ('Dui', 'Xun'): 61, ('Dui', 'Zhen'): 54,
    ('Gen', 'Dui'): 31, ('Gen', 'Gen'): 52, ('Gen', 'Kan'): 39, ('Gen', 'Kun'): 15,
    ('Gen', 'Li'): 56, ('Gen', 'Qian'): 33, ('Gen', 'Xun'): 53, ('Gen', 'Zhen'): 62,
    ('Kan', 'Dui'): 47, ('Kan', 'Gen'): 4, ('Kan', 'Kan'): 29, ('Kan', 'Kun'): 7,
    ('Kan', 'Li'): 64, ('Kan', 'Qian'): 6, ('Kan', 'Xun'): 59, ('Kan', 'Zhen'): 40,
    ('Kun', 'Dui'): 45, ('Kun', 'Gen'): 23, ('Kun', 'Kan'): 8, ('Kun', 'Kun'): 2,
    ('Kun', 'Li'): 35, ('Kun', 'Qian'): 12, ('Kun', 'Xun'): 20, ('Kun', 'Zhen'): 16,
    ('Li', 'Dui'): 49, ('Li', 'Gen'): 22, ('Li', 'Kan'): 63, ('Li', 'Kun'): 36,
    ('Li', 'Li'): 30, ('Li', 'Qian'): 13, ('Li', 'Xun'): 37, ('Li', 'Zhen'): 55,
    ('Qian', 'Dui'): 43, ('Qian', 'Gen'): 26, ('Qian', 'Kan'): 5, ('Qian', 'Kun'): 11,
    ('Qian', 'Li'): 14, ('Qian', 'Qian'): 1, ('Qian', 'Xun'): 9, ('Qian', 'Zhen'): 34,
    ('Xun', 'Dui'): 28, ('Xun', 'Gen'): 18, ('Xun', 'Kan'): 48, ('Xun', 'Kun'): 46,
    ('Xun', 'Li'): 50, ('Xun', 'Qian'): 44, ('Xun', 'Xun'): 57, ('Xun', 'Zhen'): 32,
    ('Zhen', 'Dui'): 17, ('Zhen', 'Gen'): 27, ('Zhen', 'Kan'): 3, ('Zhen', 'Kun'): 24,
    ('Zhen', 'Li'): 21, ('Zhen', 'Qian'): 25, ('Zhen', 'Xun'): 42, ('Zhen', 'Zhen'): 51
}
# Reverse the above
hexagram_number_to_trigram_pair = {
    hexagram: trigram_pair for trigram_pair, hexagram in trigram_pair_to_hexagram_number.items()
}


lines_to_trigram_name_pinyin = {
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

# Add line information to the above
for lines, pinyin in lines_to_trigram_name_pinyin.items():
    trigram_pinyin_info[pinyin]["lines"] = lines
