"""Trigram"""
from yijing_references import trigram_lines_to_trigram_pinyin


class Trigram:
    """We have our lines, let's get our trigram!"""

    def __init__(self, line_values):
        self.line_values = line_values
        self._is_moving = 6 in line_values or 9 in line_values
        self.name_current = self._lookup_name_current(line_values)
        self.moving_lines = self._identify_moving_lines(line_values)

        self.name_alternate = self._lookup_name_alternate(line_values)

    def _lookup_name_current(self, line_values: list):
        if self._is_moving:
            lookup_values_current = self._create_lookup_values_current(
                line_values)
            return self._lookup_trigram_name(lookup_values_current)
        return self._lookup_trigram_name(tuple(line_values))

    def _lookup_name_alternate(self, line_values: list):
        if self._is_moving:
            lookup_values_alternate = self._create_lookup_values_alternate(
                line_values)
            return self._lookup_trigram_name(lookup_values_alternate)
        return ""

    def __repr__(self):
        return f"Trigram(line_values={self.line_values})"

    def __str__(self):
        text = f"{self.name_current}"
        if self.name_alternate != "":
            text += f" -> {self.name_alternate}, "
            text += f"values: {self.line_values}, "
            text += f"moving lines: {self.moving_lines}"
        else:
            text += f", values: {self.line_values}"
        return text

    def _identify_moving_lines(self, line_values):
        """Identify and return the line numbers of the moving lines."""
        return [idx+1 for idx, value in enumerate(line_values) if value in [6, 9]]

    def _calculate_moving_lines(self, line_values):
        """Create a list of booleans indicating whether each line is moving."""
        return [line in [6, 9] for line in line_values]

    def _create_lookup_values_current(self, line_values: list):
        """Convert line values from 6 to 7 or 9 to 8. 7 and 8 remain the same."""
        return tuple(7 if x == 6 else 8 if x == 9 else x for x in line_values)

    def _create_lookup_values_alternate(self, line_values: list):
        """Convert line values from 6 to 8 and 9 to 7. 7 and 8 remain the same."""
        return tuple(8 if x == 6 else 7 if x == 9 else x for x in line_values)

    def _lookup_trigram_name(self, lookup_values: tuple):
        """Set trigram name (pinyin without tone levels) based on trigram line values"""
        return trigram_lines_to_trigram_pinyin[lookup_values]

    def get_values(self):
        """Return line_values"""
        return self.line_values

    def get_current(self):
        """Return name of this trigram"""
        return self.name_current

    def get_alternate(self):
        """Return name of alternate trigram"""
        return self.name_alternate

    def get_moving_lines(self):
        """Return tuple of moving lines"""
        return self.moving_lines

    def has_alternate(self):
        """Return whether or not this trigram is moving/has alternate trigram"""
        return self._is_moving


# To run once:
