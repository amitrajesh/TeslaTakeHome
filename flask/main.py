from flask import (Flask, render_template, request)
from flask_socketio import SocketIO, send
import time
app = Flask(__name__, template_folder='templates')

socketio = SocketIO(app, cors_allowed_origins="*")

# These are the config data for each MapObject (each MapObject key associates with a key
# in this dictionary) 
object_configs = {
        0: {"id" : 0, "title": "Node 0", "location": "LA"},
        1: {"id" : 1, "title": "Node 1", "location": "NY"},
        2: {"id" : 2, "title": "Node 2", "location": "Dallas"},
        3: {"id" : 3, "title": "Node 3", "location": "Miami"},
}

@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Hello world")

# Get config of a MapObject when rendering form
@app.route('/get_config', methods=["POST"])
def get_config():
    content = request.json
    return object_configs[content["id"]]

# Change config of MapObject upon form submission
@app.route('/change_config', methods=["POST"])
def change_config():
    content = request.json
    object_configs[content["id"]]["id"] = content["form_id"]
    object_configs[content["id"]]["title"] = content["form_title"]
    object_configs[content["id"]]["location"] = content["form_location"]
    print(object_configs[content["id"]])

    return None

app.run(debug=True)

if __name__ == "__main__":
    socketio.run(debug=True)


    