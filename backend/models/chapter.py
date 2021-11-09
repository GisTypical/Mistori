from datetime import datetime
import uuid

from app import db
from sqlalchemy.dialects.postgresql.base import UUID

class Chapter(db.Model):

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now, nullable=False)
    pages = db.Column(db.String, nullable=False)
    manga_id = db.Column(UUID(as_uuid=True), db.ForeignKey('manga.id', ondelete='cascade'), nullable=False)
    comments = db.relationship('Comment', backref='chapter', cascade='all, delete, delete-orphan', lazy=True)