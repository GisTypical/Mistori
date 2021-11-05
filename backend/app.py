import os

from flask import Flask, session
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from Config import *

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
app.config["JWT_SECRET_KEY"] = os.environ['JWT_SECRET_KEY']
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)
    
# Enabling CORS
cors = CORS(app, supports_credentials=True)

from controllers.user import user_bp

@app.errorhandler(404)
def not_found(e):
    return {'message': '404 Not Found'}

# @app.route('/uploads/<path:name>', methods=['GET'])
# def send_img(name):
#     return send_from_directory(os.path.join(app.root_path, 'server', 'uploads'), name, as_attachment=False)

# Blueprints que permiten separar el server en componentes
app.register_blueprint(user_bp)
