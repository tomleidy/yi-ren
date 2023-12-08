def assert_equal(actual, expected, test: str):
    """Assertion test"""
    ok = "[OK]"
    not_ok = "[ERR]"
    if expected == actual:
        print(f"{ok} {test}")
        return True
    else:
        print(f"{not_ok} {test}, '{actual}' did not match '{expected}'")
        return False
