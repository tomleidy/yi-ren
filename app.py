"""
Application: Yi Ren.

The beginnings of 易人 ( Yi Ren), an Yijing application.

The name is almost a play on words. There's a Chinese herb named Yi Yi Ren (薏苡仁) known as Job's Tears. Given that the Yijing is the book of changes, this is the app that changes a person. Which is a quality I've noticed as I've been working with it myself over the years.

By: Tom Leidy
Started 11/9/2023
"""


import argparse
from hexagram import Hexagram
from three_coins import ThreeCoins

parser = argparse.ArgumentParser(prog="yi-ren", description="an Yijing application",
                                 epilog="A work in change")
parser.add_argument("-r", "--reader", default="user")
parser.add_argument("-c", "--client", default="user")
parser.add_argument("-t", "--topic", default="")
parser.add_argument("-i", "--interactive", action="store_true")
parser.add_argument("-d", "--debug", action="store_true")

args = parser.parse_args()

# print(args)


def get_response(message: str, max_len: int = 280, default: str = None):
    """Ask user for information until satisfied"""
    response = None
    message = f"{message}, maximum {max_len} characters"
    if default:
        message = f"{message} [default: {default}]: "
    else:
        message = f"{message}: "
    while response is None:
        response = input(message)
        if default is not None and response == "":
            return default
        elif default is None and response == "":
            response = None
        elif len(response) > max_len:
            response = None
    return response


if args.interactive:
    reader = get_response("Please enter reader username", 20, "testuser")
    client = get_response("Please enter client username", 20, "testuser")
    topic = get_response("Please enter topic of reading")
    print(f"Welcome, {reader}! May your reading for {client} be insightful!")
    print(f"Topic: {topic}")
else:
    reader = args.reader
    client = args.client
    topic = args.topic


DEBUG = args.debug

if DEBUG:
    lines = []
    while len(lines) < 6:
        lines.append(ThreeCoins(False).get_value_sum())
    print(Hexagram(lines))
