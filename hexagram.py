"""Hexagram Class, which is different from Hexagon Staff"""

import json
from trigram_lookup import get_trigram_from_lines_stationary, get_trigram_from_lines_moving
from hexagram_lookup import trigram_pair_to_hexagram_number
from lines import original_to_lookup_values_moving, original_to_lookup_values_stationary

line_string = {6: "--- o ---", 7: "---   ---", 8: "---------", 9: "----x----"}


class Hexagram:
    """Instantiate with a 6 item long list of integers, 6 <= integers <= 9 """

    def __init__(self, six_line_values: list):
        self.line_values = six_line_values
        self.moving = any(line in [6, 9] for line in six_line_values)
        self.lines = self.get_lines()
        self.moving_list = self.get_moving_lines()
        self.trigrams = self.get_trigrams()
        self.hexagrams = self.get_hexagrams()
        self.print_info()
        # print(f"serialize(): {json.dumps(self.serialize())}")
        self.print_hexagrams()

    def print_info(self):
        print(f"lines: {json.dumps(self.lines)}")
        print(f"trigrams: {self.trigrams}")
        print(f"hexagram(s): {self.hexagrams}")

    def serialize(self):
        """Return a dictionary of reading"""
        return {
            "moving_list": self.moving_list,
            "lines": self.lines,
            "trigrams": self.trigrams,
            "hexagrams": self.hexagrams
        }

    def get_moving_lines(self) -> list:
        """Return list of which lines are moving, if any"""
        moving_list = []
        if self.moving:
            for idx, line in enumerate(self.line_values):
                if line in [6, 9]:
                    moving_list.append(idx)
        return moving_list

    def get_lines(self) -> dict:
        """Return dictionary of stationary and, if moving, moving line values suitable for lookup"""
        lines = {}
        lines["stationary"] = original_to_lookup_values_stationary(
            self.line_values)
        if self.moving:
            lines["moving"] = original_to_lookup_values_moving(
                self.line_values)
        return lines

    def get_trigrams(self) -> dict:
        """Return dictionary of stationary, and if moving, trigram pairs"""
        trigrams = {}
        lower = get_trigram_from_lines_stationary(self.line_values[0:3])
        upper = get_trigram_from_lines_stationary(self.line_values[3:6])
        trigrams["stationary"] = (lower, upper)
        if self.moving:
            lower = get_trigram_from_lines_moving(self.line_values[0:3])
            upper = get_trigram_from_lines_moving(self.line_values[3:6])
            trigrams["moving"] = (lower, upper)
        return trigrams

    def get_hexagrams(self) -> int:
        """Return hexagram number after looking up via lower and upper trigram names (pinyin)"""
        hexagrams = {}
        hexagrams["stationary"] = trigram_pair_to_hexagram_number[self.trigrams["stationary"]]
        if self.moving:
            hexagrams["moving"] = trigram_pair_to_hexagram_number[self.trigrams["moving"]]
        return hexagrams

    def print_hexagrams(self):
        """A method to print ASCII portrayal of the hexagram(s)"""
        for stationary_moving, lines in self.lines.items():
            print(f"{stationary_moving}:")
            for line_value in lines[::-1]:
                print(line_string[line_value])

    def get_line_string(self, line_value):
        """What does our line look like?"""
        return line_string[line_value]
