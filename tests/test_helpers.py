"""Testing suite for helper functions"""
import pytest  # pylint: disable=W0611
from gua.helpers import get_moving_lines_from_hexagram_pairs, fill_reading_dictionary
from gua.helpers import get_mutual_hexagram_from_hexagram_number


def test_get_moving_lines_from_hexagram_pairs():
    """Test get_moving_lines_from_hexagram_pairs function"""
    result_all_moving = get_moving_lines_from_hexagram_pairs(1, 2)
    result_all_stationary = get_moving_lines_from_hexagram_pairs(1, 1)
    assert result_all_moving == (1, 2, 3, 4, 5, 6)
    assert not result_all_stationary


@pytest.mark.xfail
def test_fill_reading_dictionary():
    """Test fill_reading_dictionary"""
    hexagrams_to_test = {"hexagram_stationary": 1, "hexagram_moving": 2}
    result = fill_reading_dictionary(hexagrams_to_test)
mutual_parameters = [(27, (7, 7, 7, 7, 7, 7)), (28, (8, 8, 8, 8, 8, 8))]


@pytest.mark.parametrize("hexagram_int, lines_tuple", mutual_parameters)
def test_get_mutual_hexagram_from_hexagram_number(hexagram_int, lines_tuple):
    """"""
    assert get_mutual_hexagram_from_hexagram_number(
        hexagram_int) == lines_tuple
