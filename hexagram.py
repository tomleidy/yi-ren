"""Hexagram Class, which is different from Hexagon Staff"""

import json
from helpers import get_trigram_from_lines_stationary, get_trigram_from_lines_moving
from helpers import get_hexagram_number_from_line_values
from helpers import original_to_lookup_values_moving, original_to_lookup_values_stationary

line_string = {6: "--- o ---", 7: "---   ---", 8: "---------", 9: "----x----"}


class Hexagram:
    """Instantiate with a 6 item long list of integers, 6 <= integers <= 9 """

    def __init__(self, six_line_values: list):

        # TODO: modify this so once we get the hexagram(s), we drop everything else.
        # TODO: if we want, add information to the serialize() with the future fill_dictionary_info() helper
        self.line_values = six_line_values
        self.lines = self.get_lines()
        self.moving_list = self.get_moving_lines()
        self.hexagram_stationary, self.hexagram_moving = self.get_hexagrams()
        self.print_hexagrams()

    def __str__(self) -> str:
        message_string = json.dumps(self._get_self_attributes_dict())
        return message_string

    def _get_self_attributes_dict(self):
        """Prepare variables for sharing external to instance"""
        attr_list = ["hexagram_stationary", "hexagram_moving"]
        attr_dict = {}
        for key, value in self.__dict__.items():
            if key in attr_list:
                attr_dict[key] = value
        return attr_dict

    def serialize(self) -> dict:
        """Return a dictionary of reading"""
        return self._get_self_attributes_dict()

    def get_moving_lines(self) -> list:
        """Return list of which lines are moving, if any"""
        #
        moving_list = []
        if any(line in [6, 9] for line in self.line_values):
            for idx, line in enumerate(self.line_values):
                if line in [6, 9]:
                    moving_list.append(idx)
        return moving_list

    def get_lines(self) -> dict:
        """Return dictionary of stationary and, if moving, moving line values suitable for lookup"""
        lines = {}
        lines["stationary"] = original_to_lookup_values_stationary(
            self.line_values)
        if any(line in [6, 9] for line in self.line_values):
            lines["moving"] = original_to_lookup_values_moving(
                self.line_values)
        return lines

    def get_trigrams(self) -> dict:
        """Return dictionary of stationary, and if moving, trigram pairs"""
        # TODO: refactor, turn into get_trigrams_from_hexagram(hexagram: int) -> tuple: and move to helpers
        trigrams = {}
        lower = get_trigram_from_lines_stationary(self.line_values[0:3])
        upper = get_trigram_from_lines_stationary(self.line_values[3:6])
        trigrams["stationary"] = (lower, upper)
        if any(line in [6, 9] for line in self.line_values):
            lower = get_trigram_from_lines_moving(self.line_values[0:3])
            upper = get_trigram_from_lines_moving(self.line_values[3:6])
            trigrams["moving"] = (lower, upper)
        return trigrams

    def get_hexagrams(self) -> int:
        """Return hexagram number after looking up via lower and upper trigram names (pinyin). """
        # TODO: refactor the above so that the trigram pairs come in as a tuple, stationary first, moving second
        lines_stationary = original_to_lookup_values_stationary(
            self.line_values)
        lines_moving = original_to_lookup_values_moving(self.line_values)
        hexagram_stationary = get_hexagram_number_from_line_values(
            lines_stationary)
        hexagram_moving = get_hexagram_number_from_line_values(lines_moving)
        return (hexagram_stationary, hexagram_moving)

    def print_hexagrams(self) -> None:
        """A method to print ASCII portrayal of the hexagram(s)"""
        for stationary_moving, lines in self.lines.items():
            print(f"{stationary_moving}:")
            for line_value in lines[::-1]:
                print(line_string[line_value])
            print("")

    def get_line_string(self, line_value):
        """What does our line look like?"""
        return line_string[line_value]
