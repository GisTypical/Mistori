from app import db
from flask import Blueprint, request
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
        return {'message': "submitted no data"}, 400

    for index, page in enumerate(request.files.getlist('pages'), start=1):
        print(index, page.filename)
        uploader.upload_image(
            page, folder=f'mistori/{data["mangaId"]}/{data["title"]}', public_id=index)

    pages = f'mistori/{data["mangaId"]}/{data["title"]}'

    chapter = Chapter(
        title=data['title'], date=data['date'], manga_id=data['mangaId'], pages=pages)

    db.session.add(chapter)
    db.session.commit()

    return {'message': 'Chapter created'}, 201


@chapter_bp.route('/chapter/<string:pic_id>', methods=['GET'])
def chapter_pages(pic_id):
    chapter = Chapter.query.filter_by(id=pic_id).first()
    if (not chapter):
        return {'message': 'chapter not found'}, 400

    pages = api.resources(type="upload", prefix=chapter.pages)
    return pages, 200

@chapter_bp.route('/chapter/<string:chapter_id>', methods=['DELETE'])
@jwt_required()
def delete_chapter(chapter_id):
    chapter = Chapter.query.filter_by(id=chapter_id).first()
    if (not chapter):
        return {'message': 'Chapter not found'}, 400

    api.delete_resources_by_prefix(chapter.pages)
    api.delete_folder(chapter.pages)

    db.session.delete(chapter)
    db.session.commit()
    return {'message': 'Chapter deleted'}, 200
