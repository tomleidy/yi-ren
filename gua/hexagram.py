"""Hexagram Class, which is different from Hexagon Staff"""

import json
from math import ceil
from gua.helpers import get_trigram_from_lines_stationary, get_trigram_from_lines_moving
from gua.helpers import get_hexagram_number_from_line_values
from gua.helpers import original_to_lookup_values_moving, original_to_lookup_values_stationary


# TODO: move the display functions to a display_hexagrams module?
line_string = {6: "--- o ---", 7: "---   ---", 8: "---------", 9: "----x----"}


def get_lines_max_len():
    """To dynamically adjust in case we ever want to change the length of the lines"""
    max_len = 0
    for line in line_string.values():
        if len(line) > max_len:
            max_len = len(line)
    return max_len


def two_gua_padding():
    max_len = get_lines_max_len()


class Hexagram:
    """Instantiate with a 6 item long list of integers, 6 <= integers <= 9 """

    def __init__(self, six_line_values: list):
        self.line_values = six_line_values
        self.hexagram_stationary = self.get_hexagram(get_stationary=True)
        if any(line in [6, 9] for line in self.line_values):
            self.moving = True
            self.hexagram_moving = self.get_hexagram(get_stationary=False)
        else:
            self.moving = False

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
        print(attr_dict)
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

    def get_hexagram(self, get_stationary: bool = True) -> int:
        """Return hexagram number after looking up via line numbers. """
        if get_stationary:
            lines_stationary = original_to_lookup_values_stationary(
                self.line_values)
            hexagram_stationary = get_hexagram_number_from_line_values(
                lines_stationary)
            return hexagram_stationary
        lines_moving = original_to_lookup_values_moving(self.line_values)
        hexagram_moving = get_hexagram_number_from_line_values(lines_moving)
        return hexagram_moving

    def print_hexagrams(self) -> None:
        """A method to print ASCII portrayal of the hexagram(s)"""
        if "moving" in self.lines:
            message = []
            max_len = 0
            for idx, line in enumerate(self.lines["stationary"]):
                message.append(line_string[line])
                if len(line_string[line]) > max_len:
                    max_len = len(line_string[line])
            max_len = ceil(max_len * 1.2)

            for idx, line in enumerate(self.lines["moving"]):
                message[idx] += " " * max_len
                message[idx] += line_string[line]
            print(f"stationary{' '*max_len}moving")
            for line in message[::-1]:
                print(line)
            print(f"{self.hexagram_stationary}".center(max_len))
            return None

        for stationary_moving, lines in self.lines.items():
            print("stationary")
            for line_value in lines[::-1]:
                print(line_string[line_value])
            print("")

    def get_line_string(self, line_value):
        """What does our line look like?"""
        return line_string[line_value]
