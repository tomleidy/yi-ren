"""Hexagram Class, which is different from Hexagon Staff"""

import json
from gua.helpers import get_hexagram_number_from_line_values
from gua.helpers import original_to_lookup_values_moving, original_to_lookup_values_stationary
from gua.print_hexagram import PrintHexagram


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

        PrintHexagram(self.line_values, self.moving)

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
