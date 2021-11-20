# comment.py

import datetime
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
    date = datetime.datetime.now()
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

@comment_bp.route('/comment/<string:chapter_id>', methods=['GET'])
@jwt_required()
def getComments(chapter_id):
    comments_obj = Comment.query.filter_by(chapter_id=chapter_id).all()

    comments = []
    for comment in comments_obj:
        comments.append({
            'id': comment.id,
            'text': comment.text,
            'date': comment.date,
            'parent_id': comment.parent_id,
            'username': comment.username,
            'chapter_id': comment.chapter_id
        })
    
    return {
        'comments': comments
    }, 200


@comment_bp.route('/comment/update/<string:comment_id>', methods=['GET'])
@jwt_required()
def getCommentID(comment_id):
    comment_obj = Comment.query.filter_by(id=comment_id).first()

    comment = {
        'id': comment_obj.id,
        'text': comment_obj.text,
        'date': comment_obj.date,
        'parent_id': comment_obj.parent_id,
        'username': comment_obj.username,
        'chapter_id': comment_obj.chapter_id
    }

    return comment, 200