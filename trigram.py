"""Trigram"""


trigram_lines_to_trigram_pinyin = {
    (8, 8, 8): "Qian", (8, 8, 7): "Dui", (8, 7, 8): "Li", (8, 7, 7): "Zhen",
    (7, 8, 8): "Xun", (7, 8, 7): "Kan", (7, 7, 8): "Gen", (7, 7, 7): "Kun"
}


class Trigram:
    """We have our lines, let's get our trigram!"""

    def __init__(self, lines: list):
        self.original_line_values = []
        self.line_values = []
        self.moving = False
        for line in lines:
            self.original_line_values.append(line.original)
            self.line_values.append(line.value)
            if line.moving:
                self.moving = True
        self.pinyin = trigram_lines_to_trigram_pinyin[tuple(
            self.line_values)]

    def serialize(self):
        """Get a dictionary for this trigram"""
        return {
            "values": self.line_values,
            "moving": self.moving,
            "original_values": self.original_line_values,
            "pinyin": self.pinyin
        }


if __name__ == "__main__":
    test_values_trigram_lines = {
        (9, 9, 9): "Qian", (9, 9, 6): "Dui", (9, 6, 9): "Li", (9, 6, 6): "Zhen",
        (6, 9, 9): "Xun", (6, 9, 6): "Kan", (6, 6, 9): "Gen", (6, 6, 6): "Kun",
        (8, 8, 8): "Qian", (8, 8, 7): "Dui", (8, 7, 8): "Li", (8, 7, 7): "Zhen",
        (7, 8, 8): "Xun", (7, 8, 7): "Kan", (7, 7, 8): "Gen", (7, 7, 7): "Kun"
    }
    expected_serialized_trigrams = {
        (9, 9, 9): {'values': [8, 8, 8], 'moving': True, 'original_values': [9, 9, 9], 'pinyin': 'Qian'},
        (9, 9, 6): {'values': [8, 8, 7], 'moving': True, 'original_values': [9, 9, 6], 'pinyin': 'Dui'},
        (9, 6, 9): {'values': [8, 7, 8], 'moving': True, 'original_values': [9, 6, 9], 'pinyin': 'Li'},
        (9, 6, 6): {'values': [8, 7, 7], 'moving': True, 'original_values': [9, 6, 6], 'pinyin': 'Zhen'},
        (6, 9, 9): {'values': [7, 8, 8], 'moving': True, 'original_values': [6, 9, 9], 'pinyin': 'Xun'},
        (6, 9, 6): {'values': [7, 8, 7], 'moving': True, 'original_values': [6, 9, 6], 'pinyin': 'Kan'},
        (6, 6, 9): {'values': [7, 7, 8], 'moving': True, 'original_values': [6, 6, 9], 'pinyin': 'Gen'},
        (6, 6, 6): {'values': [7, 7, 7], 'moving': True, 'original_values': [6, 6, 6], 'pinyin': 'Kun'},
        (8, 8, 8): {'values': [8, 8, 8], 'moving': False, 'original_values': [8, 8, 8], 'pinyin': 'Qian'},
        (8, 8, 7): {'values': [8, 8, 7], 'moving': False, 'original_values': [8, 8, 7], 'pinyin': 'Dui'},
        (8, 7, 8): {'values': [8, 7, 8], 'moving': False, 'original_values': [8, 7, 8], 'pinyin': 'Li'},
        (8, 7, 7): {'values': [8, 7, 7], 'moving': False, 'original_values': [8, 7, 7], 'pinyin': 'Zhen'},
        (7, 8, 8): {'values': [7, 8, 8], 'moving': False, 'original_values': [7, 8, 8], 'pinyin': 'Xun'},
        (7, 8, 7): {'values': [7, 8, 7], 'moving': False, 'original_values': [7, 8, 7], 'pinyin': 'Kan'},
        (7, 7, 8): {'values': [7, 7, 8], 'moving': False, 'original_values': [7, 7, 8], 'pinyin': 'Gen'},
        (7, 7, 7): {'values': [7, 7, 7], 'moving': False, 'original_values': [7, 7, 7], 'pinyin': 'Kun'}
    }
    print("Unit tests for trigram.py")
    from unittests import assert_equal
    from line import Line

    list_of_trigrams = []
    for lines, trigram in test_values_trigram_lines.items():
        line_list = []
        for line in lines:
            line_list.append(Line(line))
        actual = Trigram(line_list).serialize()
        expected = expected_serialized_trigrams[lines]
        message = f"{trigram} serializes properly with {lines}"
        assert_equal(actual, expected, message)
