"""Test Reading class methods"""
from datetime import datetime, timezone
import pytest
from faker import Faker

from models import Session
from models.reading import Reading
# pylint: disable=W0107

fake = Faker()

# add_reading
# get_reader_readings
# get_client_readings
# update_reading (can update hexagrams, reading_notes, topic)
# delete_reading

# TODO: define CRUD operation tests

# @pytest.mark.parametrize('update_attr', time_columns)
# def test_user_update_time_attributes(update_attr):

valid_fields = {"reader_id", "client_id", "hexagram_stationary",
                "hexagram_moving", "topic", "reading_notes"}
# created_at
# modified_at
# reading_id

reading_ids = set({})
# TODO: make sure to test for all the extra data added via helper fill_reading_dictionary()


# @pytest.mark.skip(reason="not implemented yet")
@pytest.mark.parametrize("hexagram1", list(range(1, 65)))
def test_add_valid_reading_single_hexagrams(hexagram1):
    """Test each hexagram, 1-64"""
    with Session() as session:
        reading_data = {
            "hexagram_stationary": hexagram1,
            "topic": fake.sentence(),
            "reading_notes": "test_add_valid_reading_single_hexagrams",
        }
        try:
            new_reading = Reading(reading_data)
            session.add(new_reading)
            session.commit()
            reading = new_reading.serialize()
            assert reading['reading_id']
            assert reading['hexagram_stationary'] == hexagram1
            assert reading['topic']
            assert reading['reading_notes']
        except Exception as e:
            session.rollback()
            print(f"error: {str(e)}")
        finally:
            session.delete(new_reading)
            session.commit()
            session.close()


@pytest.mark.parametrize("hexagram2", range(1, 65))
def test_add_valid_reading_two_hexagrams(hexagram2):
    """Test each hexagram, 1-64"""
    hexagram1 = 1
    if hexagram2 == 1:
        # you can't have a moving hexagram if it's the same as the stationary hexagram.
        hexagram1 = 2

    with Session() as session:
        reading_data = {
            "hexagram_stationary": hexagram1,
            "hexagram_moving": hexagram2,
            "topic": fake.sentence(),
            "reading_notes": "test_add_valid_reading_two_hexagrams",
        }
        try:
            new_reading = Reading(reading_data)
            session.add(new_reading)
            session.commit()
            reading = new_reading.serialize()
            assert reading['reading_id']
            assert reading['hexagram_stationary'] == hexagram1
            assert reading['hexagram_moving'] == hexagram2
            assert reading['topic']
            assert reading['reading_notes']
        except Exception as e:
            session.rollback()
            print(f"error: {str(e)}")
        finally:
            session.delete(new_reading)
            session.commit()
            session.close()


@pytest.mark.skip(reason="not implemented yet")
def test_get_readings_by_reader_id():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_get_readings_by_client_id():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_get_readings():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_delete_reading():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_update_reading():
    pass
