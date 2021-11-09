from datetime import datetime
import uuid

from app import db
from sqlalchemy.dialects.postgresql.base import UUID

class Manga(db.Model):

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    cover = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now, nullable=False)
    uploaded_by = db.Column(db.String, db.ForeignKey('user_account.username', ondelete='cascade'), nullable=False)
    chapters = db.relationship('Chapter', backref='manga', cascade='all, delete, delete-orphan', lazy=True)
