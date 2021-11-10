import os
from urllib.parse import MAX_CACHE_SIZE

from flask import Flask, session
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from cloudinary import config

from Config import *

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')

app.secret_key = os.environ['SECRET_KEY']
app.config.from_object(DevelopmentConfig)
app.config['MAX_CONTENT_LENGTH'] = 5*1000*1000 # 5MB

# SqlAlchemy
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# change from postgres:// to postgresql://
uri = os.environ['DATABASE_URL']
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = uri
db = SQLAlchemy(app)


# JWT Configuration
app.config["JWT_SECRET_KEY"] = os.environ['JWT_SECRET_KEY']
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)
    
# Enabling CORS
cors = CORS(app, supports_credentials=True)

# Cloudinary
config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), api_secret=os.getenv('API_SECRET'))

@app.errorhandler(404)
def not_found(e):
    return {'message': 'No existing route'}, 404

# @app.route('/uploads/<path:name>', methods=['GET'])
# def send_img(name):
#     return send_from_directory(os.path.join(app.root_path, 'server', 'uploads'), name, as_attachment=False)

# Blueprints allows routes separation in different files
from controllers.user import user_bp
from controllers.chapter import chapter_bp
from controllers.manga import manga_bp

app.register_blueprint(user_bp)
app.register_blueprint(chapter_bp)
app.register_blueprint(manga_bp)