import bcrypt
from app import db
from flask import Blueprint, request
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required)
from flask_jwt_extended.utils import create_refresh_token
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

    # Signup successful
    hashed_pass = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
    user = User_account(
        username=data['username'], full_name=data['fullName'], password=hashed_pass.decode(), admin=False)
    db.session.add(user)
    db.session.commit()

    return {'message': 'User created'}, 201


@user_bp.route('/api/login', methods=['POST'])
def user_login():
    data = request.json
    db_user = User_account.query.filter_by(username=data['username']).first()

    if not db_user or not bcrypt.checkpw(data['password'].encode(), db_user.password.encode()):
        return {'message': 'Wrong credentials'}, 401

    # Login successful
    accessToken = create_access_token(identity=db_user.username)
    refreshToken = create_refresh_token(identity=db_user.username)

    return {
        'message': 'Autentication successful', 
        'accessToken': accessToken, 
        'refreshToken': refreshToken
    }, 200

# Refresh token
@user_bp.route('/api/refresh-token', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    username_jwt = get_jwt_identity()
    accessToken = create_access_token(identity=username_jwt)
    return { 'accessToken': accessToken }

@user_bp.route('/api/user', methods=['GET'])
@jwt_required()
def get_user_data():
    username_jwt = get_jwt_identity()
    user_db = User_account.query.filter_by(username=username_jwt).first()
    return { 'username': user_db.username, 'fullName': user_db.full_name }, 200


"""
User actions
"""

@user_bp.route('/api/user', methods=['PUT'])
@jwt_required()
def update_user():
    username_jwt = get_jwt_identity()
    
    data = request.json
    db_user = User_account.query.filter_by(username=username_jwt).first()

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
@jwt_required()
def user_delete():
    username_jwt = get_jwt_identity()
    
    db_user = User_account.query.filter_by(username=username_jwt).first()
    if(not db_user):
        return {'message': 'No user found'}, 400
    db.session.delete(db_user)
    db.session.commit()
    return {'message': 'User deleted'}, 200


@user_bp.route('/api/logout', methods=['DELETE'])
@jwt_required()
def user_logout():
    # session.pop('username')
    return {'message': 'Logged out'}, 200
