# comment.py

import datetime
from app import db
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from models.comment import Comment
import pprint

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
        parent = Comment.query.filter_by(id=parent_id).first()

        db.session.add(comment)
        db.session.commit()

        return {
            'id': comment.id,
            'text': comment.text,
            'date': comment.date,
            'username': comment.username,
            'parent_id': comment.parent_id,
            'chapter_id': comment.chapter_id,
            'parent': {
                'username': parent.username,
                'text': parent.text
            }
        }, 201
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
            'chapter_id': comment.chapter_id
        }, 201


# FUNCTION getChildren()
def getChildren(comment_parent):
    comment_children = Comment.query.filter_by(
        parent_id=comment_parent).order_by(Comment.date.asc()).all()
    parent = Comment.query.filter_by(id=comment_parent).first()

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
            'parent': {
                'username': parent.username,
                'text': parent.text
            },
            'children': getChildren(comment_parent)
        })

    return children


@comment_bp.route('/comment/<string:chapter_id>', methods=['GET'])
@jwt_required()
def getComments(chapter_id):
    comments_obj = Comment.query.filter_by(
        chapter_id=chapter_id).filter_by(parent_id=None).order_by(Comment.date.desc()).all()

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

    return { 'comments': comments }, 200


@comment_bp.route('/comment/update/<string:comment_id>', methods=['GET'])
@jwt_required()
def getCommentID(comment_id):
    comment_obj = Comment.query.filter_by(id=comment_id).first()

    if comment_obj:
        comment = {
            'id': comment_obj.id,
            'text': comment_obj.text,
            'date': comment_obj.date,
            'parent_id': comment_obj.parent_id,
            'username': comment_obj.username,
            'chapter_id': comment_obj.chapter_id
        }

        return comment, 200

    else:
        return {'message': 'Comment not found'}, 400


@comment_bp.route('/comment/<string:comment_id>', methods=['PUT'])
@jwt_required()
def updateComment(comment_id):
    data = request.json

    comment = Comment.query.get(comment_id)

    if comment:
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

    else:
        return {'message': 'Comment not found'}, 400


@comment_bp.route('/comment/<string:comment_id>', methods=['DELETE'])
@jwt_required()
def deleteComment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment:
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

    else:
        return {'message': 'Comment not found'}, 400
