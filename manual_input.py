"""Validation functions which will be necessary to let people input external readings"""
pinyin_trigram_names = ["Qian", "Dui", "Li",
                        "Zhen", "Xun", "Kan", "Gen", "Kun"]


def is_valid_trigram(trigram_name: str):
    """Test if trigram name is in list of pinyin trigram names"""
    if trigram_name in pinyin_trigram_names:
        return True
    return False


def validate_trigram_list(trigrams: list):
    """Iterate through list of trigrams to test for validity, return False if error, True if not"""
    for trigram in trigrams:
        if is_valid_trigram(trigram) is False:
            return False
    return True
