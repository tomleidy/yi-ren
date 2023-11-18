"""Hexagram Class, which is different from Hexagon Staff"""

from three_coins import ThreeCoins
from trigram import Trigram
from yijing_references import trigram_pair_to_hexagram_number

line_string = {
    6: "--- o ---",
    7: "---   ---",
    8: "---------",
    9: "--- x ---"
}


class Hexagram:
    def __init__(self, lower: Trigram, upper: Trigram):
        self.lower = lower
        self.upper = upper
        self.line_values = lower.get_values() + upper.get_values()
        self.has_moving = 6 in self.line_values or 9 in self.line_values
        lookup_pair_current = (lower.get_current(), upper.get_current())

        self.hexagram_number_current = trigram_pair_to_hexagram_number[lookup_pair_current]
        self.hexagram_number_alternate = 0
        print(f"hexagram: {self.hexagram_number_current}")
        print(self.line_values)
        self.print_hexagram(self.line_values)

        if self.has_moving:
            alternate_lower = lower.get_alternate()
            alternate_upper = upper.get_alternate()
            if alternate_lower == "":
                alternate_lower = lower.get_current()
            if alternate_upper == "":
                alternate_upper = upper.get_current()

            lookup_pair_alternate = (alternate_lower, alternate_upper)
            self.hexagram_number_alternate = trigram_pair_to_hexagram_number[
                lookup_pair_alternate]


# def display_hexagram(hexagram_line_values):
#     """Take hexagram line values and print the line"""
#     for value in hexagram_line_values:
#         print(get_line_string(value))

    def print_hexagram(self, line_values):
        for line_value in line_values[::-1]:
            print(line_string[line_value])

    def get_line_string(self, line_value):
        """What does our line look like?"""
        return line_string[line_value]


DEBUG = True

if DEBUG:
    lines = []
    while len(lines) < 6:
        lines.append(ThreeCoins().get_value_sum())
    lower_trigram = Trigram(lines[0:3])
    upper_trigram = Trigram(lines[3:])
    print(lower_trigram)
    print(upper_trigram)
    hexxus = Hexagram(lower_trigram, upper_trigram)
