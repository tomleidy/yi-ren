"""Coin flipper"""
import random


class ThreeCoins:
    """The coin flipping class"""

    def __init__(self, interactive=True):
        self.interactive = interactive
        self.quiet = not interactive
        self.coin_flips = []
        self.flip_values = []

    def add_flip(self):
        """Add True or False to flip_value list: """
        self.coin_flips.append(random.choice([True, False]))

    def update_flip_values(self):
        """Set flip_values to 3 or 2 based on heads/tails in self.coin_flips"""
        if len(self.coin_flips) > 0:
            for flip in self.coin_flips:
                if flip:
                    self.flip_values.append(3)
                else:
                    self.flip_values.append(2)

    def print_flips(self):
        """Iterate through coin_flips and print out the results"""
        if not self.quiet and len(self.coin_flips) == 3:
            text = "Your coin flips were: "
            for idx, flip in enumerate(self.coin_flips):
                if flip:
                    text += "heads"
                else:
                    text += "tails"
                if idx < 2:
                    text += ", "
            print(text)

    def three_flips(self):
        """Return array of True/False"""
        if self.interactive:
            input("Please press enter to toss coins...")
        while len(self.coin_flips) < 3:
            self.add_flip()
        self.print_flips()
        self.update_flip_values()

    def get_value_sum(self):
        """Return the sum of heads/tails values"""
        if len(self.flip_values) == 0:
            self.three_flips()
        return sum(self.flip_values)
