# comment.py

from app import db
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from models.comment import Comment
from cloudinary import uploader

comment_bp = Blueprint('comment_bp', __name__)

@comment_bp.route('/comment/<string:chapter_id>', methods=['POST'])
@jwt_required()
def createComment(chapter_id):
    data = request.json
    text = data['text']
    date = data['date']
    username = get_jwt_identity()

    if 'parent_id' in data:
        parent_id = data['parent_id']
        comment = Comment(text=text, date=date, username=username, chapter_id=chapter_id, parent_id=parent_id)
    else:
        comment = Comment(text=text, date=date, username=username, chapter_id=chapter_id)

    db.session.add(comment)
    db.session.commit()

    return {
        'id': comment.id,
        'text': comment.text,
        'date': comment.date,
        'username': comment.username,
        'parent_id': comment.parent_id,
        'chapter_id': chapter_id
    }, 201