"""Hexagram lookup dictionaries and functions"""
from lines import original_to_lookup_values_moving, original_to_lookup_values_stationary
from trigram_lookup import trigram_pinyin_info
from unittests import assert_equal

lines_to_hexagrams = {
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


def get_trigram_from_lines_stationary(lines: list):
    """Take a list of 3 integers and identify the trigram, default"""
    lines = original_to_lookup_values_stationary(lines)
    return lines_to_hexagrams[tuple(lines)]


def get_trigram_from_lines_moving(lines: list):
    """Take a list of 3 integers and identify the trigram that the current one is moving to"""
    lines = original_to_lookup_values_moving(lines)
    return lines_to_hexagrams[tuple(lines)]


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

if __name__ == "__main__":
    # validate lookup methods against each other
    for lower_gua_pinyin, lower_gua_info in trigram_pinyin_info.items():
        for upper_gua_pinyin, upper_gua_info in trigram_pinyin_info.items():
            lines_for_testing = (
                lower_gua_info["lines"] + upper_gua_info["lines"])
            hexagram_from_lines = lines_to_hexagrams[lines_for_testing]
            hexagram_from_trigram_pairs = trigram_pair_to_hexagram_number[(
                lower_gua_pinyin, upper_gua_pinyin)]
            assert_equal(hexagram_from_lines, hexagram_from_trigram_pairs,
                         f"Hexagram lookup methods should match, {lower_gua_pinyin}, {upper_gua_pinyin}")
