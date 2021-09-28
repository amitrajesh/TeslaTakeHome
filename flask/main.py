from flask import (Flask, request)
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
import time
import random
import threading
from flask_cors import CORS

# For now, we allow all cross-origin requests so frontend and backend
# can interact with ease (a proxy would also work here)
app = Flask(__name__, static_folder='../build', static_url_path='/')
db = SQLAlchemy(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# This class defines the data structure behind each MapObject
class ObjectConfig(db.Model):
    true_id = db.Column(db.Integer, primary_key=True)
    form_id = db.Column(db.Integer)
    form_title = db.Column(db.String(80), nullable=False)
    location_x = db.Column(db.Float, nullable=False)
    location_y = db.Column(db.Float, nullable=False)

# Using SQlAlchemy, we create a SQL database with the default values for each of the 4 MapObjects
db.create_all()
db.session.add(ObjectConfig(true_id=0, form_id=0, form_title="Node 0", location_x=0, location_y=0))
db.session.add(ObjectConfig(true_id=1, form_id=1, form_title="Node 1", location_x=0, location_y=0))
db.session.add(ObjectConfig(true_id=2, form_id=2, form_title="Node 2", location_x=0, location_y=0))
db.session.add(ObjectConfig(true_id=3, form_id=3, form_title="Node 3", location_x=0, location_y=0))
db.session.commit()

# In the docker image, the React code will all be compiled into the build directory; we can serve from here
@app.route('/')
def send_js():
    return app.send_static_file('index.html')

# Get config of a MapObject when rendering form
@app.route('/get_config', methods=["POST"])
def get_config():
    content = request.json
    mapobj = ObjectConfig.query.filter_by(true_id=content["id"]).first()
    return {
        "form_id": mapobj.form_id,
        "form_title": mapobj.form_title,
        "location_x": mapobj.location_x,
        "location_y": mapobj.location_y
    }

# Change config of MapObject upon form submission
@app.route('/change_config', methods=["POST"])
def change_config():
    content = request.json
    mapobj = ObjectConfig.query.filter_by(true_id=content["id"]).first()
    if "form_id" in content:
        mapobj.form_id = content["form_id"]
    if "form_title" in content:
        mapobj.form_title = content["form_title"]
    if "location_x" in content:        
        mapobj.location_x = content["location_x"]
    if "location_y" in content:
        mapobj.location_y = content["location_y"]
    db.session.commit()

    return "success"


# This function will run in a background thread and continously emit data (random numbers)
def emit_data():
    while not stop_event.is_set():
        socketio.emit("data", random.randint(1, 100))
        socketio.sleep(0.5)

# When first connecting, we start a background that will continously emit data
# until it recieves a stop signal from a global threading Event
@socketio.on('connect')
def initialization():
    global stop_event
    stop_event = threading.Event() # Initialize stop signal
    data_thread = threading.Thread(target=emit_data, daemon=True)
    data_thread.start()

# On disconnect, we activate the stop signal to stop the background thread from emitting
# any more data
@socketio.on('disconnect')
def disconnection():
    stop_event.set()


if __name__ == "__main__":
    socketio.run(app, debug=True)


    