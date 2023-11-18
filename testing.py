"""Testing suite"""

from yijing_lookup import lines_to_trigram
from yijing_references import test_values_trigram_lines_all_moving


def assert_equal(actual, expected, test_description):
    """Test if two values are equal for a test"""
    if actual == expected:
        print(f"[OK] {test_description}")
        return True
    print(
        f"[ERROR] {test_description}, '{actual}' does not equal '{expected}'")
    return False


def test_lines_to_trigram():
    """Iterate through list of trigrams to test identify_trigrams"""
    # This should be separated into two tests: identify_trigram tests and convert_moving_lines_to_fixed tests
    for line_values, expected_trigram_name in test_values_trigram_lines_all_moving.items():
        result = lines_to_trigram(list(line_values))
        assert_equal(result, expected_trigram_name,
                     f"lines_to_trigram() should identify trigram {expected_trigram_name} correctly")


test_lines_to_trigram()
