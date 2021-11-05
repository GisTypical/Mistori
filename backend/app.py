import os

from flask import Flask, session
from flask.helpers import send_from_directory
from flask.sessions import SecureCookieSessionInterface
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# from flask_jwt_extended import JWTManager

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
app.config["JWT_SECRET_KEY"] = "super-secret"
# jwt = JWTManager(app)
# session_cookie = SecureCookieSessionInterface().get_signing_serializer(app)

    
# Enabling CORS
cors = CORS(app, supports_credentials=True)

from controllers.user import user_bp

# @app.after_request
# def cookies(response):
#     same_cookie = session_cookie.dumps(dict(session))
#     response.headers.add("Set-Cookie", f"co={same_cookie}; Secure; HttpOnly; SameSite=None; Path=/;")
#     return response

@app.errorhandler(404)
def not_found(e):
    return {'message': '404'}


# @app.route('/', methods=['GET'])
# def index():
#     return app.send_static_file('index.html')


# @app.route('/uploads/<path:name>', methods=['GET'])
# def send_img(name):
#     return send_from_directory(os.path.join(app.root_path, 'server', 'uploads'), name, as_attachment=False)

# Blueprints que permiten separar el server en componentes
app.register_blueprint(user_bp)
