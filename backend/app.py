from controllers.user import user_bp
import os

from flask import Flask, session
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy

from Config import *

# from dotenv import load_dotenv
# load_dotenv()

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# SqlAlchemy ya no admite postgres:// se debe llevar a postgresql://
uri = os.environ['DATABASE_URL']
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config.from_object(DevelopmentConfig)
db = SQLAlchemy(app)

app.secret_key = os.environ['SECRET_KEY']


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/uploads/<path:name>', methods=['GET'])
def send_img(name):
    return send_from_directory(os.path.join(app.root_path, 'server', 'uploads'), name, as_attachment=False)


# Blueprints que permiten separar el server en componentes
app.register_blueprint(user_bp)
