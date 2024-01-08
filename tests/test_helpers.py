import pytest
from gua.helpers import get_moving_lines_from_hexagram_pairs, fill_reading_dictionary


def test_get_moving_lines_from_hexagram_pairs():
    """Test get_moving_lines_from_hexagram_pairs function"""
    result_all_moving = get_moving_lines_from_hexagram_pairs(1, 2)
    result_all_stationary = get_moving_lines_from_hexagram_pairs(1, 1)
    assert result_all_moving == [1, 2, 3, 4, 5, 6]
    assert not result_all_stationary


@pytest.mark.xfail
def test_fill_reading_dictionary():
    """Test fill_reading_dictionary"""
    hexagrams_to_test = {"hexagram_stationary": 1, "hexagram_moving": 2}
    result = fill_reading_dictionary(hexagrams_to_test)
    assert 'moving_lines' in result
    assert 'trigrams_stationary' in result
    assert 'trigrams_moving' in result
    assert 'line_values' in result
    assert result['moving_lines'] == [1, 2, 3, 4, 5, 6]
    assert result['trigrams_stationary'] == ["Qian", "Qian"]
    assert result['trigrams_moving'] == ["Kun", "Kun"]
    assert result['line_values'] == [9, 9, 9, 9, 9, 9]
