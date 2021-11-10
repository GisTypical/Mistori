# manga.py

from app import db
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

manga_bp = Blueprint('manga_bp', __name__)

@manga_bp.route('/manga', methods=['POST'])
@jwt_required()
def createManga():
    print(request.json)

    return {
        'status': 200
    }