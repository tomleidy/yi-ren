""""Testing suite for user models"""
import pytest
from models.user import User
# from models import Session


# def test_user_serialize():
#     user = User()
#     # query = session.query(User).filter(User.user_id == 1).first()
#     result = query.serialize()
#     assert result is not None
#     assert result.username == 'defaultuser'

def test_user_lookup_username():
    """Validate User.lookup_username()"""
    user = User()
    result = user.lookup_username("defaultuser")
    assert result['user_id'] == 1
    assert result['chosen_personal_name'] == "default"
    assert result['created_at']
    assert result['last_modified']


def test_user_get_all_users():
    user = User()
    result = user.get_all_users()
    assert result[0].username == 'defaultuser'
    assert result[0].user_id == 1


@pytest.mark.skip(reason="not implemented yet")
def test_user_add():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_user_delete():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_user_update():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_user_login():
    pass
