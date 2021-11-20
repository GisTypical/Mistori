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

    comment = Comment(text=text, date=date, username=username, chapter_id=chapter_id)

    db.session.add(comment)
    db.session.commit()

    return {
        'chapter_id': chapter_id,
        'text': comment.text,
        'date': comment.date,
        'username': comment.username
    }, 201