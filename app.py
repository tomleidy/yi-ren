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
parser.add_argument("-t", "--topic", default="user's unstated topic")
args = parser.parse_args()

print(args)


# reader: message, default, 20
# user: message, default, 20
# topic: message, no default, 280


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


if args.reader is None:
    reader = get_response("Please enter reader username", 20, "testuser")
else:
    reader = args.reader

if args.reader is None:
    client = get_response("Please enter client username", 20, "testuser")
else:
    client = args.client
if args.topic is None:
    topic = get_response("Please enter topic of reading")
else:
    topic = args.topic


print(f"Welcome, {reader}! May your reading for {client} be insightful!")
print(f"Topic: {topic}")


DEBUG = True

if DEBUG:
    lines = []
    while len(lines) < 6:
        lines.append(ThreeCoins(False).get_value_sum())
    # lower_trigram = Trigram(lines[0:3])
    # upper_trigram = Trigram(lines[3:])
    # print(lower_trigram)
    # print(upper_trigram)
    hexxus = Hexagram(lines)
