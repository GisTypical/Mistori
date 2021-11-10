import uuid

from app import db
from sqlalchemy.dialects.postgresql.base import UUID
from models.manga import Manga
from models.chapter import Chapter
from models.comment import Comment

follower = db.Table('follower', 
    db.Column('user_id', UUID(as_uuid=True), db.ForeignKey('user_account.id', ondelete='cascade'), primary_key=True),
    db.Column('manga_id', UUID(as_uuid=True), db.ForeignKey(Manga.id, ondelete='cascade'), primary_key=True)
)

class User_account(db.Model):

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String, unique=True, nullable=False)
    full_name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    admin = db.Column(db.Boolean, nullable=False)
    mangas = db.relationship('Manga', backref='user_account', cascade='all, delete, delete-orphan', lazy=True)
    comments = db.relationship('Comment', backref='user_account', cascade='all, delete, delete-orphan', lazy=True)
    follows = db.relationship('Manga', secondary=follower, cascade='all, delete', lazy='subquery', backref=db.backref('user_account', lazy=True))

