from gua.helpers import original_to_lookup_values_moving
from math import ceil

line_string = {6: "--- o ---", 7: "---   ---", 8: "---------", 9: "----x----"}


def set_line_string_pad_len():
    """Calculate padding length and add to line_string dictionary"""
    max_len = 0
    for line in line_string.values():
        if len(line) > max_len:
            max_len = len(line)
    line_string["pad_len"] = ceil(max_len * 1.2)


set_line_string_pad_len()


class PrintHexagram:
    """Class to automatically print hexagram(s) to the terminal"""

    def __init__(self, line_values, moving):
        self.line_values = line_values
        print(line_values)
        self.moving = moving
        self.print_hexagrams()

    def _get_title(self):
        title = "stationary"
        if self.moving:
            title += f"{' '* line_string['pad_len']}moving"
        return title

    def _get_print_message(self, lines, lines_moving) -> list:
        """Take hexagram lines and return combined message string for tty display"""
        message = []
        for idx, line in enumerate(lines):
            message.append(line_string[line])
        if lines_moving:
            for idx, line in enumerate(lines_moving):
                message[idx] += " " * line_string['pad_len']
                message[idx] += line_string[line]
        return message

    def _print_title_and_message(self, message: list):
        """Print title(s) and hexagram(s)"""
        print(self._get_title())
        for line in message[::-1]:
            print(line)

    def print_hexagrams(self) -> None:
        """A method to print ASCII portrayal of the hexagram(s)"""

        lines_moving = None
        if self.moving:
            lines_moving = original_to_lookup_values_moving(self.line_values)
        message = self._get_print_message(self.line_values, lines_moving)
        self._print_title_and_message(message)
        return None

    def get_line_string(self, line_value):
        """What does our line look like?"""
        return line_string[line_value]
