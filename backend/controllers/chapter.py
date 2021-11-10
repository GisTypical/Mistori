from app import db
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from models.chapter import Chapter
from cloudinary import uploader
from cloudinary import api

chapter_bp = Blueprint('chapter_bp', __name__)


@chapter_bp.route('/chapter', methods=['POST'])
@jwt_required()
def create_chapter():
    data = request.form

    if not data:
        return {}, 400

    for index, page in enumerate(request.files.getlist('pages'), start=1):
        print(index, page.filename)
        uploader.upload_image(
            page, folder=f'mistori/{data["mangaId"]}/{data["title"]}', public_id=index)

    chapter = Chapter(
        title=data['title'], date=data['date'], manga_id=data['mangaId'], pages=f'mistori/{data["mangaId"]}')

    db.session.add(chapter)
    db.session.commit()

    return {'message': 'Chapter created'}, 201


@chapter_bp.route('/chapter/<string:pic_id>', methods=['GET'])
@jwt_required()
def chapter_pages(pic_id):
    chapter = Chapter.query.filter_by(id=pic_id).first()
    pages = api.resources(type="upload", prefix=chapter.pages)
    return pages, 200
