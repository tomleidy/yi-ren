"""
Application: Yi Ren.

The beginnings of 易人 ( Yi Ren), an Yijing application.

The name is almost a play on words. There's a Chinese herb named Yi Yi Ren (薏苡仁) known as Job's Tears. Given that the Yijing is the book of changes, this is the app that changes a person. Which is a quality I've noticed as I've been working with it myself over the years.

By: Tom Leidy
Started 11/9/2023
"""
import random
import argparse

parser = argparse.ArgumentParser(prog="yi-ren", description="an Yijing application",
                                 epilog="A work in change")
parser.add_argument("-u", "--user", default="default")
parser.add_argument("-c", "--client", default="unspecified")

args = parser.parse_args()

# Steps:
# add input() for topic
# add input for user doing reading
# add input

# order:
# get lines
#



    def get_line(self):
        """Return the sum value for a given line (should be 6-9)"""
        line_values = get_three_flips(False)
        line_sum = 0
        for x in line_values:
            line_sum += x
        return line_sum

    def get_six_lines(self):
        """Get six lines for a full hexagram"""
        hexagram_line_values = []
        while len(hexagram_line_values) < 6:
            hexagram_line_values.append(get_line())
        return hexagram_line_values

    def get_line_string(self, line_value):
        """What does our line look like?"""
        if line_value == 9:
            return "--x--"
        if line_value == 8:
            return "-----"
        if line_value == 7:
            return "-- --"
        if line_value == 6:
            return "--o--"


# values = get_six_lines()
# display_hexagram(values)
# lower_trigram = values[0:3]
# print(lines_to_trigram(lower_trigram))
# upper_trigram = values[3:]
# print(lines_to_trigram(upper_trigram))
