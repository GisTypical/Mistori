# manga.py

import os
from app import db
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

manga_bp = Blueprint('manga_bp', __name__)

@manga_bp.route('/manga', methods=['POST'])
@jwt_required()
def createManga():
    for value in request.form.values():
        print(value)
    
    print(request.files['cover'].filename)
    cwd = os.getcwd()
    print(cwd)

    return {
        'name': request.form['name'],
        'author': request.form['author'],
        'date': request.form['date'],
        'status': request.form['status'],
        'description': request.form['description'],
        'cover': request.files['cover'].filename
    }