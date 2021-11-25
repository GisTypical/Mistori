from app import db
from cloudinary import uploader
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.manga import Manga
from models.user import User_account


manga_bp = Blueprint('manga_bp', __name__)


@manga_bp.route('/manga', methods=['POST'])
@jwt_required()
def createManga():
    file = request.files['cover']
    if file:
        upload_result = uploader.upload(
            file, folder=f'mistori/{request.form["name"]}/cover', public_id='cover')

    name = request.form['name']
    author = request.form['author']
    description = request.form['description']
    cover = upload_result['secure_url']
    status = request.form['status']
    date = request.form['date']
    uploaded_by = get_jwt_identity()

    manga = Manga(name=name, author=author, description=description,
                  cover=cover, status=status, date=date, uploaded_by=uploaded_by)

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

# Get Manga Info for Page
@manga_bp.route('/manga/<string:manga_id>', methods=['GET'])
@jwt_required(optional=True)
def getMangaID(manga_id):
    manga_db = Manga.query.filter_by(id=manga_id).first()
    chapters_list = []
    for chapter in manga_db.chapters:
        chapters_list.append({
            'id': chapter.id,
            'title': chapter.title,
            'date': chapter.date
        })
    
    username = get_jwt_identity()
    if(username): 
        is_follower = isFollower(manga_db, username)
        
    manga = {
        'id': manga_db.id,
        'name': manga_db.name,
        'author': manga_db.author,
        'description': manga_db.description,
        'date': manga_db.date,
        'status': manga_db.status,
        'cover': manga_db.cover,
        'chapters': chapters_list,
        'uploadedBy': manga_db.uploaded_by,
        'isFollower': is_follower
    }

    return manga, 200

def isFollower(manga_db, username):
    for user in manga_db.user_follow:
        if user.username == username: 
            return True

    return False

# Get User Uploaded Mangas
@manga_bp.route('/manga', methods=['GET'])
@jwt_required()
def getUploadedManga():
    username = get_jwt_identity()
    mangas_obj = Manga.query.filter_by(
        uploaded_by=username).order_by(Manga.date).all()

    mangas = []

    for manga in mangas_obj:
        mangas.append({
            'id': manga.id,
            'name': manga.name,
            'cover': manga.cover,
            'author': manga.author,
            'date': manga.date
        })

    return {
        'mangas': mangas
    }, 200

@manga_bp.route('/manga/<string:manga_id>', methods=['DELETE'])
@jwt_required()
def delete_manga(manga_id):
    manga_obj = Manga.query.filter_by(id=manga_id).first()

    if (not manga_obj):
        return {'message': 'No manga found'}, 400

    if (manga_obj.uploaded_by != get_jwt_identity()): 
        return {'message': 'Not uploader'}, 403

    db.session.delete(manga_obj)
    db.session.commit()

    return {
        'message': "manga deleted"
    }, 200

# Get all Mangas for search page
@manga_bp.route('/manga/all', methods=['GET'])
def get_all_mangas():
    manga_obj = Manga.query.all()

    manga_list = []
    for manga in manga_obj:
        manga_list.append({
            'id': manga.id,
            'name': manga.name,
            'cover': manga.cover,
            'author': manga.author,
            'date': manga.date
        })

    return {"mangas": manga_list}, 200

# Get all mangas within a search value
@manga_bp.route('/manga/search/<string:searchValue>', methods=['GET'])
@jwt_required()
def getMangasSearched(searchValue):
    mangas_obj = Manga.query.filter(Manga.name.ilike(f'%{searchValue}%')).all()

    mangas = []

    for manga in mangas_obj:
      mangas.append({
        'id': manga.id,
        'name': manga.name,
        'cover': manga.cover,
        'author': manga.author,
        'date': manga.date
      })

    return { 'mangas': mangas }, 200
    

## Follows
# Create user manga follow/subscribe relationship
@manga_bp.route('/manga/follow', methods=['POST'])
@jwt_required()
def follow_manga():
    manga_id = request.json['mangaId']
    user = User_account.query.filter_by(username=get_jwt_identity()).first()

    manga = Manga.query.filter_by(id=manga_id).first()
    manga.user_follow.append(user)

    db.session.commit()
    return {"message": f"{get_jwt_identity()} now follows {manga.id}"}, 201

# Create user manga follow/subscribe relationship
@manga_bp.route('/manga/follow/<string:manga_id>', methods=['DELETE'])
@jwt_required()
def unfollow_manga(manga_id):
    user = User_account.query.filter_by(username=get_jwt_identity()).first()
    manga = Manga.query.filter_by(id=manga_id).first()
    manga.user_follow.remove(user)
    db.session.commit()
    return {"message": f"{get_jwt_identity()} unfollowed {manga_id}"}, 200

# Get user mangas
@manga_bp.route('/manga/followed', methods=['GET'])
@jwt_required()
def get_followed_mangas():
    user = User_account.query.filter_by(username=get_jwt_identity()).first()

    manga_list = []
    for followed_manga in user.follows:
        manga_list.append({
            'id': followed_manga.id,
            'name': followed_manga.name,
            'cover': followed_manga.cover,
            'author': followed_manga.author,
            'date': followed_manga.date
        })

    return {'mangas': manga_list}, 200
