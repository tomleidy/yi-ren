"""Helper functions for looking up hexagram and trigram data"""
from datetime import datetime, timezone
from reference_data import lines_to_hexagram_number, hexagram_number_to_lines, trigram_pair_to_hexagram_number
from reference_data import lines_to_trigram_name_pinyin, trigram_pinyin_info, hexagram_number_to_trigram_pair
from reference_data import numeric_to_value_stationary, numeric_to_value_moving
from unittests import assert_equal


def get_lines_from_hexagram(hexagram: int) -> tuple:
    """Return tuple of 6 line values for a hexagram"""
    if hexagram in hexagram_number_to_lines:
        return hexagram_number_to_lines[hexagram]
    return None


def get_moving_lines_from_hexagram_pairs(hexagram1: int, hexagram2: int) -> list:
    """Compare two hexagrams and get tuple of moving_lines"""
    moving_lines = []
    if hexagram1 != hexagram2:
        lines1 = get_lines_from_hexagram(hexagram1)
        lines2 = get_lines_from_hexagram(hexagram2)
        for x in range(6):
            if lines1[x] != lines2[x]:
                moving_lines.append(x+1)
    return moving_lines


def original_to_lookup_values_stationary(lines: list) -> list:
    """Return the stationary line values for a series of lines, i.e. 6->7, 9->8"""
    sevens_and_eights_only = []
    for line in lines:
        sevens_and_eights_only.append(numeric_to_value_stationary[line])
    return tuple(sevens_and_eights_only)


def original_to_lookup_values_moving(lines: list) -> list:
    """Return the moving line values for a series of lines, i.e. 6->8, 9->7"""
    sevens_and_eights_only = []
    for line in lines:
        sevens_and_eights_only.append(numeric_to_value_moving[line])
    return tuple(sevens_and_eights_only)


# Get trigrams


def get_trigram_from_lines_stationary(lines: list) -> str:
    """Take a list of 3 integers and identify the trigram, default"""
    lines = original_to_lookup_values_stationary(lines)
    return lines_to_trigram_name_pinyin[tuple(lines)]


def get_trigram_from_lines_moving(lines: list) -> str:
    """Take a list of 3 integers and identify the trigram that the current one is moving to"""
    lines = original_to_lookup_values_moving(lines)
    return lines_to_trigram_name_pinyin[tuple(lines)]


def get_trigram_pair_from_hexagram_number(hexagram: int) -> tuple:
    """Look up trigram pair that makes up a specific hexagram"""
    if hexagram in hexagram_number_to_trigram_pair:
        return hexagram_number_to_trigram_pair[hexagram]
    return None

# Get hexagrams


def get_hexagram_number_from_trigram_pair(trigrams: tuple) -> int:
    """Return hexagram number by looking up a pair of trigrams"""
    return trigram_pair_to_hexagram_number[trigrams]


def get_hexagram_number_from_line_values(line_values: list) -> tuple:
    """Return tuple with hexagram(s) from line_values"""
    if any(line in [6, 9] for line in line_values):
        return 0
    lookup = original_to_lookup_values_stationary(line_values)
    return lines_to_hexagram_number[lookup]


def get_mutual_hexagram_from_hexagram_number(hexagram: int) -> int:
    """
    Relevant to Alfred Huang style Yijing readings only.
    The mutual hexagram is the hexagram that:
        lower trigram is lines 2-4.
        upper trigram is lines 3-5.
    """
    lines = get_lines_from_hexagram(hexagram)
    return tuple(lines[1:4] + lines[2:5])


# Fill hexagram dictionary with relevant information

def fill_reading_dictionary(reading: dict) -> dict:
    """Fill reading dictionary with extra information"""
    hex_stationary = reading['hexagram_stationary']
    trigrams_stationary = hexagram_number_to_trigram_pair[hex_stationary]
    lines_stationary = get_lines_from_hexagram(hex_stationary)
    reading['trigrams_stationary'] = trigrams_stationary
    reading['lines_stationary'] = lines_stationary
    mutual_lines = get_mutual_hexagram_from_hexagram_number(
        hex_stationary)
    mutual = get_hexagram_number_from_line_values(mutual_lines)
    reading['mutual'] = mutual
    if 'hexagram_moving' in reading:
        reading['moving'] = True
        hex_moving = reading['hexagram_moving']
        moving_lines = get_moving_lines_from_hexagram_pairs(
            hex_stationary, hex_moving)
        trigrams_moving = hexagram_number_to_trigram_pair[hex_moving]
        lines_moving = hexagram_number_to_lines[hex_moving]
        reading['lines_moving'] = lines_moving
        reading['moving_lines'] = moving_lines
        reading['trigrams_moving'] = trigrams_moving
    return reading


# Miscellaneous helper functions
def utc_ts():
    """Return UTC timestamp"""
    return datetime.now(timezone.utc)


if __name__ == "__main__":
    # TODO: find where these tests go. reference data?
    def validate_trigram_lookups():
        """Validate trigram lookup methods. Keep test functions out of global scope"""
        hexagrams = {}
        for lower_key, lower_gua in lines_to_trigram_name_pinyin.items():
            print(lower_key, lower_gua)
            for upper_key, upper_gua in lines_to_trigram_name_pinyin.items():
                combined_key = lower_key + upper_key
                combined_gua = lower_gua + ", " + upper_gua
                hexagrams[combined_key] = combined_gua
        print(hexagrams)

    def validate_hexagram_lookups():
        """
        Validate hexagram lookup tables against each other.
        Probably no longer necessary, but it was useful to validate the dictionaries and functions once.
        """
        for lower_gua_pinyin, lower_gua_info in trigram_pinyin_info.items():
            for upper_gua_pinyin, upper_gua_info in trigram_pinyin_info.items():
                lines_for_testing = (
                    lower_gua_info["lines"] + upper_gua_info["lines"])
                hexagram_from_lines = lines_to_hexagram_number[lines_for_testing]
                hexagram_from_trigram_pairs = trigram_pair_to_hexagram_number[(
                    lower_gua_pinyin, upper_gua_pinyin)]
                assert_equal(hexagram_from_lines, hexagram_from_trigram_pairs,
                             f"Hexagram lookup methods should match, {lower_gua_pinyin}, {upper_gua_pinyin}")

    validate_trigram_lookups()
    validate_hexagram_lookups()
