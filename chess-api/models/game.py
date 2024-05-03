from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from app import db


class Game(db.Model):
    __tablename__ = "game"

    id: Mapped[int] = mapped_column(db.Integer,primary_key=True)
    user_uuid: Mapped[str] = mapped_column(db.String,unique=False,nullable=False)
