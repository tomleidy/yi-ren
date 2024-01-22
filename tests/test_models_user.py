""""Testing suite for user models"""
import pytest
from models.user import User
from models.user import user_column_list, protected_update_columns, unprotected_update_columns
# from models import Session
from faker import Faker

username = "test_user_add"
nickname = "testing 1 2 3"


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
    assert result['success']
    result = result['userinfo']
    assert result['user_id'] == 1
    assert result['nickname'] == "default"
    assert result['created_at']
    assert result['last_modified']


def test_user_lookup_username_nonexistant():
    fake = Faker()
    username = fake.user_name()
    user = User()
    result = user.lookup_username(username)
    assert result['success'] is False


def test_user_get_all_users():
    user = User()
    result = user.get_all_users()
    assert result['success']
    result = result['userlist']
    assert result[0].username == 'defaultuser'
    assert result[0].user_id == 1


def test_user_add():
    user = User()
    # really depending on this to work.
    user.deluser({"username": username})
    result = user.adduser({"username": username, "nickname": nickname})
    assert result['success']
    result = result['userinfo']
    assert isinstance(result['user_id'], int)
    assert result['username'] == username
    assert result['nickname'] == nickname
    # assert result['password'] == password


def test_user_delete():
    user = User()
    # added_user = user.adduser()
    user.adduser({"username": username, "nickname": nickname})
    result = user.deluser({"username": username})
    assert result['success']


def test_user_lookup_user_no_username_or_id():
    user = User()
    temp_username = fake.user_name()
    result = user._lookup_user({"nothing_to_find": ""})
    print(result)
    assert result['success'] is False
    assert result['error'] == "No username or user_id provided for lookup"


def test_user_lookup_user_nonexistent_username():
    user = User()
    temp_username = fake.user_name()
    result = user._lookup_user({"username": temp_username})
    print(result)
    assert result['success'] is False
    assert result['error'] == "User not found"


def test_user_lookup_user():
    user = User()
    temp_username = fake.user_name()
    user.adduser({"username": temp_username, "nickname": nickname})

    result = user._lookup_user({"username": temp_username})
    print(result)
    assert result['success']
    assert result['userinfo']
    serial_results = result['userinfo'].serialize()
    assert serial_results['username'] == temp_username
    user.deluser({"username": username})
    user = User()
    user.adduser({"username": username, "nickname": nickname})
    # this should be "defaultuser"
    result = user.get_userid({"username": 1})
    assert isinstance(result, int)
    user.deluser({"username": username})


@pytest.mark.skip(reason="not implemented yet")
def test_user_update_protected_attributes():
    # TODO: add user with minimal information
    # TODO: attempt to change username/created_at/modified_at/user_id (should fail)
    # TODO: delete user
    user.adduser({"username": username, "nickname": nickname})


@pytest.mark.skip(reason="not implemented yet")
def test_user_change_username():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_user_change_password():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_user_login():
    pass
