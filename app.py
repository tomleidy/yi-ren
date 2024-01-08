"""
Application: Yi Ren.

The beginnings of 易人 ( Yi Ren), an Yijing application.

The name is almost a play on words. There's a Chinese herb named Yi Yi Ren (薏苡仁) known as Job's Tears. Given that the Yijing is the book of changes, this is the app that changes a person. Which is a quality I've noticed as I've been working with it myself over the years.

By: Tom Leidy
Started 11/9/2023
"""


import argparse
from gua.hexagram import Hexagram
from gua.three_coins import ThreeCoins
from models.reading import Reading
from models.user import User
import os
from dotenv import load_dotenv

load_dotenv()

parser = argparse.ArgumentParser(prog="yi-ren", description="an Yijing application",
                                 epilog="A work in change")
parser.add_argument("-r", "--reader", default="defaultuser")
parser.add_argument("-c", "--client", default="defaultuser")
parser.add_argument("-t", "--topic", default="")
parser.add_argument("-i", "--interactive", action="store_true")
parser.add_argument("-n", "--no-database", action="store_true")
args = parser.parse_args()


def get_response(message: str, max_len: int = 280, default: str = None):
    """Ask user for information until conditions are satisfied"""
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


if args.interactive and not args.no_database:
    reader = get_response("Please enter reader username", 20, "defaultuser")
    client = get_response("Please enter client username", 20, "defaultuser")
    topic = get_response("Please enter topic of reading")
    print(f"Welcome, {reader}!")
    print(f"Topic: {topic}")
else:
    reader = args.reader
    client = args.client
    topic = args.topic

if os.getenv('ENVIRONMENT') == 'development':
    lines = []
    while len(lines) < 6:
        lines.append(ThreeCoins(interactive=args.interactive).get_value_sum())
    hexagram = Hexagram(lines)
    # print(hexagram)
# TODO: save reading to database
# next steps for the above:
# copy over the list of things to put in the dictionary to send to Reading
# add things to dictionary to send to Reading
# add client_id / reader_id constraints
# oh, add is_reader to defaultuser? maybe later.
# TODO: add password authentication for readers (wait, how are we securing this? seems like we'd need a different database...)
# TODO: all users can see the history of readings they've received
# TODO: users who are readers can see all the readings they've performed for other users
# TODO: clients can see reading notes
# TODO: readers can see/write reading notes

# TODO: non-readers cannot see user notes
# TODO: readers can see user notes
# TODO: admin can write notes about users
# TODO: admin can see all readings received by any user or given by any reader

# TODO: load readings from database and display them

# TODO: figure out where these todo items should go
# TODO: interface to add users (specifically readers)
# TODO: interface for readers to look up reading information about users
# TODO: interface to authenticate users
# TODO:
# TODO: Maja D'aoust style shadow moving lines (the same moving lines for the moving hexagram)
