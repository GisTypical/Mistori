from datetime import datetime
import uuid

from app import db
from sqlalchemy.dialects.postgresql.base import UUID

class Comment(db.Model):

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    date = db.Column(db.DateTime, default=datetime.now, nullable=False)
    text = db.Column(db.Text, nullable=False)
    parent_id = db.Column(UUID(as_uuid=True), db.ForeignKey('comment.id', ondelete='cascade', onupdate='cascade'))
    username = db.Column(db.String, db.ForeignKey('user_account.username', ondelete='cascade', onupdate='cascade'), nullable=False)
    chapter_id = db.Column(UUID(as_uuid=True), db.ForeignKey('chapter.id', ondelete='cascade', onupdate='cascade'), nullable=False)
    # parent = db.relationship('Comment', backref='comment', remote_side=[id], cascade='all, delete, delete-orphan', single_parent=True)
    parent = db.relationship('Comment', remote_side=[id])