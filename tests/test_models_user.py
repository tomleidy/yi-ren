""""Testing suite for user models"""
from datetime import datetime, timezone
import pytest
from faker import Faker

from models.user import User
from models.user import unprotected_update_columns as uuc
from models.user import text_columns, time_columns
# pylint: disable=W0107

fake = Faker()

# TODO: add password authentication
# TODO: make a separate list here. we don't want these changing lightly.
# TODO: test_user_update_user_id (should fail)
# TODO: test user update for user who doesn't exist
# TODO: create lists based on type of test to be done
# TODO: tests for booleans
# TODO: tests for dates
# TODO: rename functions based on type of test

# These columns are boolean and dates. The test function as extant is for text.
purge_from_uuc = ['is_reader']
unprotected_update_columns = [attr for attr in uuc if attr not in purge_from_uuc]


def test_user_lookup_username():
    """Validate User.lookup_username()"""
    user = User()
    result = user.lookup_username("defaultuser")
    assert result['success']
    result = result.get('userinfo')
    assert result['user_id'] == 1
    assert result['nickname'] == "default"
    assert result['created_at']
    assert result['last_modified']


def test_user_lookup_username_nonexistant():
    """Test User lookup_username with username that shouldn't exist"""
    temp_username = fake.user_name()
    user = User()
    result = user.lookup_username(temp_username)
    assert result['success'] is False


def test_user_get_all_users():
    """Test User get_all_users method"""
    user = User()
    result = user.get_all_users()
    assert result['success']
    result = result.get('userlist')
    assert result[0].username == 'defaultuser'
    assert result[0].user_id == 1


def test_user_add():
    """Test User adduser method"""
    user = User()
    # really depending on this to work.
    temp_username = fake.user_name()
    result = user.adduser({"username": temp_username, "nickname": temp_username})
    assert result['success']
    result = result.get('userinfo')
    assert isinstance(result['user_id'], int)
    assert result['username'] == temp_username
    assert result['nickname'] == temp_username
    user.deluser({"username": temp_username})
    # assert result['password'] == password


def test_user_delete():
    """Test User deluser method"""
    user = User()
    temp_username = fake.user_name()
    user.adduser({"username": temp_username, "nickname": temp_username})
    result = user.deluser({"username": temp_username})
    assert result['success']
    second_result = user.lookup_username(temp_username)
    assert second_result['success'] is False


def test_user_lookup_user_no_username_or_id():
    """Test out the protected User _lookup_user method with incorrect search setp"""
    user = User()
    result = user._lookup_user({"nothing_to_find": ""})  # pylint: disable=W0212
    assert result['success'] is False
    assert result['error'] == "No username or user_id provided for lookup"


def test_user_lookup_user_nonexistent_username():
    """Test out the protected User _lookup_user method with username that shouldn't exist"""
    user = User()
    temp_username = fake.user_name()
    result = user._lookup_user({"username": temp_username})  # pylint: disable=W0212
    print(result)
    assert result['success'] is False
    assert result['error'] == "User not found"


def test_user_lookup_user():
    """Test out protected User _lookup_user method in successful case"""
    user = User()
    temp_username = fake.user_name()
    user.adduser({"username": temp_username, "nickname": temp_username})
    result = user._lookup_user({"username": temp_username})  # pylint: disable=W0212
    print(result)
    assert result['success']
    assert result['userinfo']
    serial_results = result['userinfo'].serialize()
    assert serial_results['username'] == temp_username
    user.deluser({"username": temp_username})


@pytest.mark.parametrize('update_attr', text_columns)
def test_user_update_text_attributes(update_attr):
    """Test the user update function for text attributes"""
    user = User()
    temp_username = fake.user_name()
    user.adduser({"username": temp_username, "nickname": temp_username})
    user = User()
    update_dict = {"username": temp_username, update_attr: "update"}
    result = user.updateuser(update_dict)
    assert result['success']
    assert isinstance(result['userinfo'], dict)
    result = result.get('userinfo')
    assert update_attr in result
    assert result.get(update_attr) == "update"
    user.deluser({"username": temp_username})


@pytest.mark.parametrize('update_attr', time_columns)
def test_user_update_time_attributes(update_attr):
    """Test User updateuser method for time values"""
    user = User()
    temp_username = fake.user_name()
    user.adduser({"username": temp_username, "nickname": temp_username})
    timenow = datetime.now(timezone.utc)
    result = user.updateuser({"username": temp_username, update_attr: timenow})
    assert result['success'] is False
    assert result['error'] == f'Invalid key(s): {update_attr}'
    user.deluser({"username": temp_username})


def test_user_update_empty_attributes():
    """Test User updateuser method with insufficient arguments"""
    user = User()
    temp_username = fake.user_name()
    user.adduser({"username": temp_username, "nickname": temp_username})
    result = user.updateuser({"username": temp_username})
    assert result['success'] is False
    assert result['error'] == 'Insufficient data provided'
    user.deluser({"username": temp_username})


@pytest.mark.skip(reason="not implemented yet")
def test_user_change_username():
    """Test User updateuser method for username"""
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_user_change_password():
    """Test User changepassword method"""
    pass


@pytest.mark.skip(reason="not implemented yet")
def test_user_login():
    """Test User login method"""
    pass
