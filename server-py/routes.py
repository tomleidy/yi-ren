from flask import Flask, request, jsonify

app = Flask(__name__)
"""
# Blueprints for route bundling
## route module

from flask import Blueprint

yijing_routes = Blueprint('yijing', __name__)

@yijing_routes.route('/')
def your_route():
    # route logic here

## __init__.py

from flask import Flask
from .yijing_routes import yijing_routes  # adjust import path as needed

app = Flask(__name__)
app.register_blueprint(yijing_routes, url_prefix='/yijing')
"""


@app.route('/')
def home():
    return "Welcome to the API!"


@app.route('/reading/', methods=["GET"])
def get_readings():
    # if logged out, 403
    # if logged in: list of readings for that user_id
    return f"see above"

@app.route("/reading", methods=["POST"])
def post_reading():
    # if logged out, 403
    # if logged in, add reading to database with details from post body
    return f"see above"

@app.route("/reading/<reading_id>", methods=["GET"])
def get_reading(reading_id):
    # if logged out, 403
    # if userid does not match reading, 403
    # if logged in, get reading from database with id
    return f"see above"


# Route with variable/parameter in URL
@app.route('/user/<user_id>')
def get_user(user_id):
    return f"Getting user with ID: {user_id}"

# Route with specific HTTP methods
@app.route('/api/data', methods=['GET', 'POST'])
def handle_data():
    if request.method == 'POST':
        # Access JSON data from request body
        data = request.json
        return jsonify({"message": "Data received", "data": data})
    else:
        return jsonify({"message": "Please send data via POST"})

# Route with query parameters
@app.route('/search')
def search():
    # Access query parameters like: /search?q=something
    query = request.args.get('q', '')
    return jsonify({"search_query": query})

# Route with multiple HTTP methods
@app.route('/resource', methods=['GET', 'POST', 'PUT', 'DELETE'])
def handle_resource():
    if request.method == 'GET':
        return "Reading resource"
    elif request.method == 'POST':
        return "Creating resource"
    elif request.method == 'PUT':
        return "Updating resource"
    elif request.method == 'DELETE':
        return "Deleting resource"

if __name__ == '__main__':
    app.run(debug=True)
