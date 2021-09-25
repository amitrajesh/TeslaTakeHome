from flask import (Flask, render_template, request)
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
import time
import random
app = Flask(__name__, template_folder='templates')
app.config['SECRET_KEY'] = 'secret!'
db = SQLAlchemy(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# This class defines the data structure behind each MapObject
class ObjectConfig(db.Model):
    true_id = db.Column(db.Integer, primary_key=True)
    form_id = db.Column(db.Integer)
    form_title = db.Column(db.String(80), nullable=False)
    form_location = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.obj_id


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

# Connection test message (when frontend first connects)
@socketio.on('connect')
def initialization():
    emit('connection', 'test')

# Returns a random number when frontend requests data
@socketio.on('get_data')
def send_data():
    emit('data', random.random())

socketio.run(app)

if __name__ == "__main__":
    socketio.run(app)


    