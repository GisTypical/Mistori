# comment.py

import datetime

from sqlalchemy.sql.elements import Null
from app import db
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from models.comment import Comment
from sqlalchemy.orm import aliased

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
        comment = Comment(text=text, date=date, username=username,
                          chapter_id=chapter_id, parent_id=parent_id)
    else:
        comment = Comment(text=text, date=date,
                          username=username, chapter_id=chapter_id)

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


def getChildren(comment_parent):
    comment_children = Comment.query.filter_by(parent_id=comment_parent).all()

    children = []

    for comment in comment_children:
        comment_parent = comment.id
        children.append({
            'id': comment.id,
            'date': comment.date,
            'text': comment.text,
            'parent_id': comment.parent_id,
            'username': comment.username,
            'chapter_id': comment.chapter_id,
            'children': getChildren(comment_parent)
        })

    return children


@comment_bp.route('/comment/<string:chapter_id>', methods=['GET'])
@jwt_required()
def getComments(chapter_id):
    comments_obj = Comment.query.filter_by(
        chapter_id=chapter_id).filter_by(parent_id=None).all()

    comments = []
    for comment in comments_obj:
        comments.append({
            'id': comment.id,
            'text': comment.text,
            'date': comment.date,
            'parent_id': comment.parent_id,
            'username': comment.username,
            'chapter_id': comment.chapter_id,
            'children': getChildren(comment.id)
        })

    return {
        'comments': comments
    }, 200


@comment_bp.route('/comment/children/<string:comment_id>', methods=['GET'])
@jwt_required()
def getCommentChildren(comment_id):
    comment_obj = Comment.query.filter_by(id=comment_id).first()

    children = getChildren(comment_obj.id)

    comment = {
        'id': comment_obj.id,
        'date': comment_obj.date,
        'text': comment_obj.text,
        'parent_id': comment_obj.parent_id,
        'username': comment_obj.username,
        'chapter_id': comment_obj.chapter_id,
        'children': children
    }

    return comment, 200


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


@comment_bp.route('/comment/<string:comment_id>', methods=['PUT'])
@jwt_required()
def updateComment(comment_id):
    data = request.json

    comment = Comment.query.get(comment_id)
    comment.text = data['text']

    db.session.commit()

    return {
        'id': comment.id,
        'text': comment.text,
        'date': comment.date,
        'parent_id': comment.parent_id,
        'username': comment.username,
        'chapter_id': comment.chapter_id
    }, 200


@comment_bp.route('/comment/<string:comment_id>', methods=['DELETE'])
@jwt_required()
def deleteComment(comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()

    return {
        'id': comment.id,
        'text': comment.text,
        'date': comment.date,
        'parent_id': comment.parent_id,
        'username': comment.username,
        'chapter_id': comment.chapter_id
    }, 200
