"""Functions and dictionaries that nourish trigram and hexagram lookup functions"""


def convert_lines_to_sevens_and_eights_only_stationary(lines: list):
    """Return the stationary line values for a series of lines, i.e. 6->7, 9->8"""
    sevens_and_eights_only = []
    for line in lines:
        sevens_and_eights_only.append(numeric_to_value_stationary[line])
    return sevens_and_eights_only


def convert_lines_to_sevens_and_eights_only_moving(lines: list):
    """Return the moving line values for a series of lines, i.e. 6->8, 9->7"""
    sevens_and_eights_only = []
    for line in lines:
        sevens_and_eights_only.append(numeric_to_value_moving[line])
    return sevens_and_eights_only


numeric_to_value_stationary = {6: 7, 7: 7, 8: 8, 9: 8}
numeric_to_value_moving = {6: 8, 7: 7, 8: 8, 9: 7}
