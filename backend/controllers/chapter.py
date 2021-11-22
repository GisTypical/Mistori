import time

from app import db
from cloudinary import api, uploader
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.chapter import Chapter
from models.manga import Manga

chapter_bp = Blueprint('chapter_bp', __name__)

@chapter_bp.route('/chapter', methods=['POST'])
@jwt_required()
def create_chapter():
    data = request.form

    if not data:
        return {'message': "submitted no data"}, 400

    manga = Manga.query.filter_by(id=data["mangaId"]).first()

    if not manga: 
        return {'message': 'manga not found'}, 400

    pages = f'mistori/{manga.name}/{data["title"]}'

    chapter = Chapter(
        title=data['title'], manga_id=data['mangaId'], pages=pages)

    db.session.add(chapter)
    db.session.commit()

    # Upload images after database commit
    for index, page in enumerate(request.files.getlist('pages'), start=1):
        print(index, page.filename)
        uploader.upload_image(
            page, folder=f'mistori/{manga.name}/{data["title"]}', public_id=str(time.time()))

    return {'message': 'Chapter created'}, 201


@chapter_bp.route('/chapter/<string:chapter_id>', methods=['GET'])
def chapter_pages(chapter_id):
    chapter = Chapter.query.filter_by(id=chapter_id).first()
    if (not chapter):
        return {'message': 'chapter not found'}, 400

    pages = api.resources(type="upload", prefix=chapter.pages, max_results=100)
    return pages, 200


@chapter_bp.route('/chapter/<string:chapter_id>', methods=['DELETE'])
@jwt_required()
def delete_chapter(chapter_id):
    chapter = Chapter.query.filter_by(id=chapter_id).first()
    if (not chapter):
        return {'message': 'Chapter not found'}, 400
        
    # Get manga to check if it is the uploader
    manga = Manga.query.filter_by(id=chapter.manga_id).first()

    if(manga.uploaded_by != get_jwt_identity()):
        return {'message': 'Not Uploader'}, 403

    # Delete images inside folder
    api.delete_resources_by_prefix(chapter.pages)
    # Delete folder (has to be empty first)
    api.delete_folder(chapter.pages)

    db.session.delete(chapter)
    db.session.commit()
    return {'message': 'Chapter deleted'}, 200
