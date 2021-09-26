from flask import (Flask, render_template, request)
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
import time
import random
import threading

app = Flask(__name__, template_folder='templates')
db = SQLAlchemy(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# This class defines the data structure behind each MapObject
class ObjectConfig(db.Model):
    true_id = db.Column(db.Integer, primary_key=True)
    form_id = db.Column(db.Integer)
    form_title = db.Column(db.String(80), nullable=False)
    form_location = db.Column(db.String(80), nullable=False)

# Using SQlAlchemy, we create a SQL database with the default values for each of the 4 MapObjects
db.create_all()
db.session.add(ObjectConfig(true_id=0, form_id=0, form_title="Node 0", form_location="LA"))
db.session.add(ObjectConfig(true_id=1, form_id=1, form_title="Node 1", form_location="NY"))
db.session.add(ObjectConfig(true_id=2, form_id=2, form_title="Node 2", form_location="Dallas"))
db.session.add(ObjectConfig(true_id=3, form_id=3, form_title="Node 3", form_location="Miami"))
db.session.commit()

@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Hello world")

# Get config of a MapObject when rendering form
@app.route('/get_config', methods=["POST"])
def get_config():
    content = request.json
    mapobj = ObjectConfig.query.filter_by(true_id=content["id"]).first()
    return {
        "form_id": mapobj.form_id,
        "form_title": mapobj.form_title,
        "form_location": mapobj.form_location
    }

# Change config of MapObject upon form submission
@app.route('/change_config', methods=["POST"])
def change_config():
    content = request.json
    mapobj = ObjectConfig.query.filter_by(true_id=content["id"]).first()
    mapobj.form_id = content["form_id"]
    mapobj.form_title = content["form_title"]
    mapobj.form_location = content["form_location"]
    db.session.commit()

    return "success"



def emit_data():
    while not stop_event.is_set():
        socketio.emit("data", random.randint(1, 100))
        socketio.sleep(0.5)

# Connection test message (when frontend first connects)
@socketio.on('connect')
def initialization():
    print("Connecting")
    global stop_event
    stop_event = threading.Event()
    data_thread = threading.Thread(target=emit_data, daemon=True)
    data_thread.start()

@socketio.on('disconnect')
def disconnection():
    print("Setting stop event")
    stop_event.set()



if __name__ == "__main__":
    socketio.run(app, debug=True)


    