import pytest
from gua.hexagram import Hexagram


def test_serialize_with_only_stationary_yin():
    """Examine hexamine serialize results for validity with stationary (yin) lines only"""
    line_values_stationary = [7, 7, 7, 7, 7, 7]
    hexagram = Hexagram(line_values_stationary)
    result = hexagram.serialize()
    assert 'hexagram_stationary' in result
    assert result['hexagram_stationary'] == 2
    assert isinstance(result['hexagram_stationary'], int)
    assert 1 <= result['hexagram_stationary'] <= 64


def test_serialize_with_only_stationary_yang():
    """Examine hexamine serialize results for validity with stationary (yang) lines only"""
    line_values_stationary = [8, 8, 8, 8, 8, 8]
    hexagram = Hexagram(line_values_stationary)
    result = hexagram.serialize()
    assert 'hexagram_stationary' in result
    assert result['hexagram_stationary'] == 1
    assert isinstance(result['hexagram_stationary'], int)
    assert 1 <= result['hexagram_stationary'] <= 64


def test_serialize_with_moving_hexagram_yin():
    """Examine hexamine serialize results for validity with stationary (yin) lines only"""
    line_values_stationary = [6, 6, 6, 6, 6, 6]
    hexagram = Hexagram(line_values_stationary)
    result = hexagram.serialize()
    assert 'hexagram_stationary' in result
    assert isinstance(result['hexagram_stationary'], int)
    assert result['hexagram_stationary'] == 2
    assert result['hexagram_moving'] == 1
    assert 1 <= result['hexagram_stationary'] <= 64


def test_serialize_with_moving_hexagram_yang():
    """Examine hexamine serialize results for validity with stationary (yin) lines only"""
    line_values_stationary = [9, 9, 9, 9, 9, 9]
    hexagram = Hexagram(line_values_stationary)
    result = hexagram.serialize()
    assert 'hexagram_stationary' in result
    assert isinstance(result['hexagram_stationary'], int)
    assert result['hexagram_stationary'] == 1
    assert result['hexagram_moving'] == 2
    assert 1 <= result['hexagram_stationary'] <= 64
