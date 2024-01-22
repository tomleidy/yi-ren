""""Testing suite for user models"""
import pytest
from models.user import User
from models.user import unprotected_update_columns as uuc
from models.user import protected_update_columns
# from models import Session
from faker import Faker
from datetime import datetime, timezone

username = "test_user_add"
nickname = "testing 1 2 3"
fake = Faker()

# TODO: make a separate list here. we don't want these changing lightly.

purge_from_uuc = ['is_reader', 'safe_to_call', 'safe_to_email', 'safe_to_text']
unprotected_update_columns = [attr for attr in uuc if attr not in purge_from_uuc]


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
    temp_username = fake.user_name()
    user = User()
    result = user.lookup_username(temp_username)
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


@pytest.mark.parametrize('update_attr', unprotected_update_columns)
def test_user_update_unprotected_attributes(update_attr):
    user = User()
    user.adduser({"username": username, "nickname": nickname})
    user = User()
    update_dict = {"username": username, update_attr: "update"}
    result = user.updateuser(update_dict)
    print(f"result: {result}")
    assert result['success']
    result = result.get('userinfo')
    assert result.get(update_attr)
    assert result.get(update_attr) == "update"
    user.deluser({"username": username})


@pytest.mark.skip(reason="not implemented yet")
@pytest.mark.parametrize('update_attr', ['created_at', 'last_modified'])
def test_user_update_time_attributes(update_attr):
    # TODO: attempt to change username/created_at/last_odified/user_id (should fail)
    # TODO: attempt to change username/user_id (should fail)
    # TODO: delete user
    user = User()
    temp_username = fake.user_name()
    user.adduser({"username": temp_username, "nickname": temp_username})
    timenow = datetime.now(timezone.utc)
    result = user.updateuser({"username": temp_username, update_attr: timenow})
    assert result['success'] is False
    assert result[update_attr] is not timenow
    user.deluser({"username": temp_username})


@pytest.mark.skip(reason="not implemented yet")
def test_user_change_username():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_user_change_password():
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_user_login():
    pass
