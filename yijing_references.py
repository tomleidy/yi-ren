"""Lookup tables"""

trigram_pair_to_hexagram_number = {
    ("Dui", "Dui"): 58, ("Dui", "Gen"): 41, ("Dui", "Kan"): 60, ("Dui", "Kun"): 19,
    ("Dui", "Li"): 38, ("Dui", "Qian"): 10, ("Dui", "Xun"): 61, ("Dui", "Zhen"): 54,
    ("Gen", "Dui"): 31, ("Gen", "Gen"): 52, ("Gen", "Kan"): 39, ("Gen", "Kun"): 15,
    ("Gen", "Li"): 56, ("Gen", "Qian"): 33, ("Gen", "Xun"): 53, ("Gen", "Zhen"): 62,
    ("Kan", "Dui"): 47, ("Kan", "Gen"): 4, ("Kan", "Kan"): 29, ("Kan", "Kun"): 7,
    ("Kan", "Li"): 64, ("Kan", "Qian"): 6, ("Kan", "Xun"): 59, ("Kan", "Zhen"): 40,
    ("Kun", "Dui"): 45, ("Kun", "Gen"): 23, ("Kun", "Kan"): 8, ("Kun", "Kun"): 2,
    ("Kun", "Li"): 35, ("Kun", "Qian"): 12, ("Kun", "Xun"): 20, ("Kun", "Zhen"): 16,
    ("Li", "Dui"): 49, ("Li", "Gen"): 22, ("Li", "Kan"): 63, ("Li", "Kun"): 36,
    ("Li", "Li"): 30, ("Li", "Qian"): 13, ("Li", "Xun"): 37, ("Li", "Zhen"): 55,
    ("Qian", "Dui"): 43, ("Qian", "Gen"): 26, ("Qian", "Kan"): 5, ("Qian", "Kun"): 11,
    ("Qian", "Li"): 14, ("Qian", "Qian"): 1, ("Qian", "Xun"): 9, ("Qian", "Zhen"): 34,
    ("Xun", "Dui"): 28, ("Xun", "Gen"): 18, ("Xun", "Kan"): 48, ("Xun", "Kun"): 46,
    ("Xun", "Li"): 50, ("Xun", "Qian"): 44, ("Xun", "Xun"): 57, ("Xun", "Zhen"): 32,
    ("Zhen", "Dui"): 17, ("Zhen", "Gen"): 27, ("Zhen", "Kan"): 3, ("Zhen", "Kun"): 24,
    ("Zhen", "Li"): 21, ("Zhen", "Qian"): 25, ("Zhen", "Xun"): 42, ("Zhen", "Zhen"): 51
}


trigram_lines_to_trigram_pinyin = {
    (8, 8, 8): "Qian", (8, 8, 7): "Dui", (8, 7, 8): "Li", (8, 7, 7): "Zhen",
    (7, 8, 8): "Xun", (7, 8, 7): "Kan", (7, 7, 8): "Gen", (7, 7, 7): "Kun"
}

# this one needs to be moved to the testing suite
test_values_trigram_lines_all_moving = {
    (9, 9, 9): "Qian", (9, 9, 6): "Dui", (9, 6, 9): "Li", (9, 6, 6): "Zhen",
    (6, 9, 9): "Xun", (6, 9, 6): "Kan", (6, 6, 9): "Gen", (6, 6, 6): "Kun"
}
