"""Class for each line of a trigram/hexagram"""

original_to_value = {6: 7, 7: 7, 8: 8, 9: 8}


class Line:
    """Keep track of one line, and one line only"""

    def __init__(self, value: int):
        self.moving = False
        self.original = value
        self.value = original_to_value[value]
        if value in [6, 9]:
            self.moving = True
        else:
            self.moving = False

    def serialize(self):
        """Get a dictionary for this line"""
        return {
            "value": self.value,
            "moving": self.moving,
            "original": self.original
        }


if __name__ == "__main__":
    from unittests import assert_equal
    print("Unit tests for line.py")
    # Unit tests
    line6_expected_serial = {"value": 7, "moving": True, "original": 6}
    line7_expected_serial = {"value": 7, "moving": False, "original": 7}
    line8_expected_serial = {"value": 8, "moving": False, "original": 8}
    line9_expected_serial = {"value": 8, "moving": True, "original": 9}
    assert_equal(Line(6).serialize(), line6_expected_serial,
                 "Line(6).serialize()")
    assert_equal(Line(7).serialize(), line7_expected_serial,
                 "Line(7).serialize()")
    assert_equal(Line(8).serialize(), line8_expected_serial,
                 "Line(8).serialize()")
    assert_equal(Line(9).serialize(), line9_expected_serial,
                 "Line(9).serialize()")
