import re


def is_valid_hexagram(hexagram) -> bool:
    """Validate a hexagram string is either 1-64 or a string of 6 binary digits"""
    if re.match(r"^([1-9]|[1-5][0-9]|6[0-4])$", hexagram):
        return True
    if re.match(r"^[01]{6}$", hexagram):
        return True
    return False