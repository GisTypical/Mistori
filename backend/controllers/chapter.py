from app import db
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

chapter_bp = Blueprint('chapter_bp', __name__)

@chapter_bp.route('/chapter', methods=['POST'])
@jwt_required()
def create_manga():
    print(request.form['chapterName'])

    for uploaded_img in request.files.getlist('pagesImgs'):
        print(uploaded_img.filename)
        uploaded_img.save(uploaded_img.filename)
    return {}, 200