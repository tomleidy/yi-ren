"""Class for Trigram interpretation"""

from trigram_lookup import get_trigram_from_lines_stationary


class Trigram:
    """We have 3 lines? We have a Trigram. Not quite a Triforce."""

    def __init__(self, lines: list):
        self.pinyin = get_trigram_from_lines_stationary(lines)
        self.moving = any(line in [6, 9] for line in lines)
        self.values = lines

    def serialize(self):
        """Get a dictionary for this trigram"""
        return {
            "pinyin": self.pinyin,
            "moving": self.moving,
            "values": self.values
        }


if __name__ == "__main__":
    test_values_trigram_lines = {
        (9, 9, 9): "Qian", (9, 9, 6): "Dui", (9, 6, 9): "Li", (9, 6, 6): "Zhen",
        (6, 9, 9): "Xun", (6, 9, 6): "Kan", (6, 6, 9): "Gen", (6, 6, 6): "Kun",
        (8, 8, 8): "Qian", (8, 8, 7): "Dui", (8, 7, 8): "Li", (8, 7, 7): "Zhen",
        (7, 8, 8): "Xun", (7, 8, 7): "Kan", (7, 7, 8): "Gen", (7, 7, 7): "Kun"
    }
    expected_serialized_trigrams = {
        (9, 9, 9): {"moving": True, "values": [9, 9, 9], "pinyin": "Qian"},
        (9, 9, 6): {"moving": True, "values": [9, 9, 6], "pinyin": "Dui"},
        (9, 6, 9): {"moving": True, "values": [9, 6, 9], "pinyin": "Li"},
        (9, 6, 6): {"moving": True, "values": [9, 6, 6], "pinyin": "Zhen"},
        (6, 9, 9): {"moving": True, "values": [6, 9, 9], "pinyin": "Xun"},
        (6, 9, 6): {"moving": True, "values": [6, 9, 6], "pinyin": "Kan"},
        (6, 6, 9): {"moving": True, "values": [6, 6, 9], "pinyin": "Gen"},
        (6, 6, 6): {"moving": True, "values": [6, 6, 6], "pinyin": "Kun"},
        (8, 8, 8): {"moving": False, "values": [8, 8, 8], "pinyin": "Qian"},
        (8, 8, 7): {"moving": False, "values": [8, 8, 7], "pinyin": "Dui"},
        (8, 7, 8): {"moving": False, "values": [8, 7, 8], "pinyin": "Li"},
        (8, 7, 7): {"moving": False, "values": [8, 7, 7], "pinyin": "Zhen"},
        (7, 8, 8): {"moving": False, "values": [7, 8, 8], "pinyin": "Xun"},
        (7, 8, 7): {"moving": False, "values": [7, 8, 7], "pinyin": "Kan"},
        (7, 7, 8): {"moving": False, "values": [7, 7, 8], "pinyin": "Gen"},
        (7, 7, 7): {"moving": False, "values": [7, 7, 7], "pinyin": "Kun"}
    }
    print("Unit tests for trigram.py")
    from unittests import assert_equal

    list_of_trigrams = []
    for test_lines, trigram in test_values_trigram_lines.items():
        line_list = []
        for test_line in test_lines:
            line_list.append(test_line)
        actual = Trigram(line_list).serialize()
        expected = expected_serialized_trigrams[test_lines]
        message = f"{trigram} serializes properly with {test_lines}"
        assert_equal(actual, expected, message)
