# manga.py

import os

from werkzeug.utils import secure_filename
from app import db
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from cloudinary import uploader
from models.manga import Manga

manga_bp = Blueprint('manga_bp', __name__)

@manga_bp.route('/manga', methods=['POST'])
@jwt_required()
def createManga():
    file = request.files['cover']
    if file:
        upload_result = uploader.upload(file, folder=f'mistori/{request.form["name"]}/cover', public_id='cover')

    name = request.form['name']
    author = request.form['author']
    description = request.form['description']
    cover = upload_result['secure_url']
    status = request.form['status']
    date = request.form['date']
    uploaded_by = get_jwt_identity()
    
    manga = Manga(name=name, author=author, description=description, cover=cover, status=status, date=date, uploaded_by=uploaded_by)

    db.session.add(manga)
    db.session.commit()

    return {
        'name': request.form['name'],
        'author': request.form['author'],
        'date': request.form['date'],
        'status': request.form['status'],
        'description': request.form['description'],
        'cover': request.files['cover'].filename
    }, 200


@manga_bp.route('/manga', methods=['GET'])
@jwt_required()
def getUploadedManga():
    username = get_jwt_identity()
    mangas_obj = Manga.query.filter_by(uploaded_by = username).order_by(Manga.date).all()

    mangas = []

    for manga in mangas_obj:
        mangas.append({'id': manga.id, 'name': manga.name, 'cover': manga.cover, 'author': manga.author})
    
    for manga in mangas:
        for key, value in manga.items():
            print(key, value)

    return {
        'mangas': mangas
    }, 200


@manga_bp.route('/manga/<string:manga_id>', methods=['GET'])
def getMangaID(manga_id):
    manga_obj = Manga.query.filter_by(id = manga_id).first()

    chapters_list = []
    for chapter in manga_obj.chapters:
        chapters_list.append({
            'id': chapter.id,
            'title': chapter.title,
            'date': chapter.date
        })
        
    manga = {
        'id': manga_obj.id,
        'name': manga_obj.name,
        'author': manga_obj.author,
        'description': manga_obj.description,
        'date': manga_obj.date,
        'status': manga_obj.status,
        'cover': manga_obj.cover,
        'chapters': chapters_list
    }

    return manga, 200