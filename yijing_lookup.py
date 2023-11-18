"""Look up Yijing data"""

from yijing_references import trigram_pair_to_hexagram_number


def trigrams_to_hexagram(trigrams: list):
    """Use trigram pair to find hexagram"""
    if len(trigrams) != 2:
        return 0
    return trigram_pair_to_hexagram_number[tuple(trigrams)]


print(trigrams_to_hexagram(["Dui", "Kan"]))
print(trigrams_to_hexagram(["Qian", "Qian"]))
print(trigrams_to_hexagram(["Kun", "Kun"]))
