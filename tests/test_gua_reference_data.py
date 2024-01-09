"""Testing suite to validate reference data. This stuff should never change."""
import pytest
from reference_data import lines_to_hexagram_number, trigram_pair_to_hexagram_number

hexagram_number_to_hexagram_lines = {
    1: (8, 8, 8, 8, 8, 8), 2: (7, 7, 7, 7, 7, 7), 3: (8, 7, 7, 7, 8, 7), 4: (7, 8, 7, 7, 7, 8),
    5: (8, 8, 8, 7, 8, 7), 6: (7, 8, 7, 8, 8, 8), 7: (7, 8, 7, 7, 7, 7), 8: (7, 7, 7, 7, 8, 7),
    9: (8, 8, 8, 7, 8, 8), 10: (8, 8, 7, 8, 8, 8), 11: (8, 8, 8, 7, 7, 7), 12: (7, 7, 7, 8, 8, 8),
    13: (8, 7, 8, 8, 8, 8), 14: (8, 8, 8, 8, 7, 8), 15: (7, 7, 8, 7, 7, 7), 16: (7, 7, 7, 8, 7, 7),
    17: (8, 7, 7, 8, 8, 7), 18: (7, 8, 8, 7, 7, 8), 19: (8, 8, 7, 7, 7, 7), 20: (7, 7, 7, 7, 8, 8),
    21: (8, 7, 7, 8, 7, 8), 22: (8, 7, 8, 7, 7, 8), 23: (7, 7, 7, 7, 7, 8), 24: (8, 7, 7, 7, 7, 7),
    25: (8, 7, 7, 8, 8, 8), 26: (8, 8, 8, 7, 7, 8), 27: (8, 7, 7, 7, 7, 8), 28: (7, 8, 8, 8, 8, 7),
    29: (7, 8, 7, 7, 8, 7), 30: (8, 7, 8, 8, 7, 8), 31: (7, 7, 8, 8, 8, 7), 32: (7, 8, 8, 8, 7, 7),
    33: (7, 7, 8, 8, 8, 8), 34: (8, 8, 8, 8, 7, 7), 35: (7, 7, 7, 8, 7, 8), 36: (8, 7, 8, 7, 7, 7),
    37: (8, 7, 8, 7, 8, 8), 38: (8, 8, 7, 8, 7, 8), 39: (7, 7, 8, 7, 8, 7), 40: (7, 8, 7, 8, 7, 7),
    41: (8, 8, 7, 7, 7, 8), 42: (8, 7, 7, 7, 8, 8), 43: (8, 8, 8, 8, 8, 7), 44: (7, 8, 8, 8, 8, 8),
    45: (7, 7, 7, 8, 8, 7), 46: (7, 8, 8, 7, 7, 7), 47: (7, 8, 7, 8, 8, 7), 48: (7, 8, 8, 7, 8, 7),
    49: (8, 7, 8, 8, 8, 7), 50: (7, 8, 8, 8, 7, 8), 51: (8, 7, 7, 8, 7, 7), 52: (7, 7, 8, 7, 7, 8),
    53: (7, 7, 8, 7, 8, 8), 54: (8, 8, 7, 8, 7, 7), 55: (8, 7, 8, 8, 7, 7), 56: (7, 7, 8, 8, 7, 8),
    57: (7, 8, 8, 7, 8, 8), 58: (8, 8, 7, 8, 8, 7), 59: (7, 8, 7, 7, 8, 8), 60: (8, 8, 7, 7, 8, 7),
    61: (8, 8, 7, 7, 8, 8), 62: (7, 7, 8, 8, 7, 7), 63: (8, 7, 8, 7, 8, 7), 64: (7, 8, 7, 8, 7, 8)}


hexagram_number_to_trigram_pairs = {
    1: ('Qian', 'Qian'), 2: ('Kun', 'Kun'), 3: ('Zhen', 'Kan'), 4: ('Kan', 'Gen'),
    5: ('Qian', 'Kan'), 6: ('Kan', 'Qian'), 7: ('Kan', 'Kun'), 8: ('Kun', 'Kan'),
    9: ('Qian', 'Xun'), 10: ('Dui', 'Qian'), 11: ('Qian', 'Kun'), 12: ('Kun', 'Qian'),
    13: ('Li', 'Qian'), 14: ('Qian', 'Li'), 15: ('Gen', 'Kun'), 16: ('Kun', 'Zhen'),
    17: ('Zhen', 'Dui'), 18: ('Xun', 'Gen'), 19: ('Dui', 'Kun'), 20: ('Kun', 'Xun'),
    21: ('Zhen', 'Li'), 22: ('Li', 'Gen'), 23: ('Kun', 'Gen'), 24: ('Zhen', 'Kun'),
    25: ('Zhen', 'Qian'), 26: ('Qian', 'Gen'), 27: ('Zhen', 'Gen'), 28: ('Xun', 'Dui'),
    29: ('Kan', 'Kan'), 30: ('Li', 'Li'), 31: ('Gen', 'Dui'), 32: ('Xun', 'Zhen'),
    33: ('Gen', 'Qian'), 34: ('Qian', 'Zhen'), 35: ('Kun', 'Li'), 36: ('Li', 'Kun'),
    37: ('Li', 'Xun'), 38: ('Dui', 'Li'), 39: ('Gen', 'Kan'), 40: ('Kan', 'Zhen'),
    41: ('Dui', 'Gen'), 42: ('Zhen', 'Xun'), 43: ('Qian', 'Dui'), 44: ('Xun', 'Qian'),
    45: ('Kun', 'Dui'), 46: ('Xun', 'Kun'), 47: ('Kan', 'Dui'), 48: ('Xun', 'Kan'),
    49: ('Li', 'Dui'), 50: ('Xun', 'Li'), 51: ('Zhen', 'Zhen'), 52: ('Gen', 'Gen'),
    53: ('Gen', 'Xun'), 54: ('Dui', 'Zhen'), 55: ('Li', 'Zhen'), 56: ('Gen', 'Li'),
    57: ('Xun', 'Xun'), 58: ('Dui', 'Dui'), 59: ('Kan', 'Xun'), 60: ('Dui', 'Kan'),
    61: ('Dui', 'Xun'), 62: ('Gen', 'Zhen'), 63: ('Li', 'Kan'), 64: ('Kan', 'Li')
}

parameters = []
for idx in range(1, 65):
    trigrams = hexagram_number_to_trigram_pairs[idx]
    lines = hexagram_number_to_hexagram_lines[idx]
    parameters.append((trigrams, lines))


@pytest.mark.parametrize("trigram_tuple, lines_tuple", parameters)
def test_lookup_values(trigram_tuple, lines_tuple):
    assert lines_to_hexagram_number[lines_tuple] == trigram_pair_to_hexagram_number[trigram_tuple]
