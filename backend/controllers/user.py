import bcrypt
from flask_jwt_extended.utils import create_refresh_token
from app import db
from flask import Blueprint, request, session
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from models.user import User_account

user_bp = Blueprint('user_bp', __name__)

"""
User auth
"""
@user_bp.route('/api/signup', methods=['POST'])
def user_signup():
    data = request.json
    duplicate = User_account.query.filter_by(username=data['username']).first()

    if duplicate:
        return {'message': 'Username already exists'}, 409

    hashed_pass = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
    user = User_account(
        username=data['username'], full_name=data['fullName'], password=hashed_pass.decode())
    db.session.add(user)
    db.session.commit()
    return {'message': 'User created'}, 201


@user_bp.route('/api/login', methods=['POST'])
def user_login():
    data = request.json
    db_user = User_account.query.filter_by(username=data['username']).first()

    if not db_user or not bcrypt.checkpw(data['password'].encode(), db_user.password.encode()):
        return {'message': 'Wrong credentials'}, 401

    session['username'] = db_user.username
    accessToken = create_access_token(identity=db_user.username)
    refreshToken = create_refresh_token(identity=db_user.username)

    return {
        'message': 'Autentication successful', 
        'accessToken': accessToken, 
        'refreshToken': refreshToken
    }, 200

@user_bp.route('/api/refresh-token', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    username_jwt = get_jwt_identity()
    accessToken = create_access_token(identity=username_jwt)
    return { 'accessToken': accessToken }


@user_bp.route('/api/loggedin', methods=['GET'])
@jwt_required()
def user_loggedin():
    username_jwt = get_jwt_identity()
    print(username_jwt)
    return {'loggedin_as': username_jwt}, 200

@user_bp.route('/api/user', methods=['GET'])
def user_fullname():
    user_db = User_account.query.filter_by(username=session['username']).first()
    return {'full_name': user_db.full_name}, 200


"""
User actions
"""

@user_bp.route('/api/user', methods=['PUT'])
def update_user():
    data = request.json

    # Tomar username del session
    db_user = User_account.query.filter_by(username=session['username']).first()

    if not data['full_name'] and not data['password']:
        return {'message': 'No changes were made'}, 400

    if data['full_name']:
        db_user.full_name = data['full_name']

    if data['password']:
        hashed_pass = bcrypt.hashpw(
            data['password'].encode(), bcrypt.gensalt())
        db_user.password = hashed_pass.decode()

    db.session.commit()
    return {'message': 'Changes made successfully'}, 200


@user_bp.route('/api/user', methods=['DELETE'])
def user_delete():
    db_user = User_account.query.filter_by(username=session['username']).first()
    db.session.delete(db_user)
    db.session.commit()
    session.pop('username')
    return {'message': 'User deleted'}


@user_bp.route('/api/logout', methods=['DELETE'])
def user_logout():
    session.pop('username')
    return {'message': 'Logged out'}, 200
