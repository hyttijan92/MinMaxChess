from sqlalchemy.sql import func
from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class GameStatus(enum.Enum):
    ONGOING = "ONGOING"
    ENDED = "ENDED"
class GameEngine(enum.Enum):
    ALPHABETA = "ALPHABETA"
    MINMAX = "MINMAX"
    RANDOM = "RANDOM"

class Game(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    user_uuid = db.Column(db.String,unique=False,nullable=False)
    fen = db.Column(db.String,unique=False,nullable=False)
    game_status = db.Column(db.Enum(GameStatus),default=GameStatus.ONGOING)
    game_engine = db.Column(db.Enum(GameEngine),nullable=False)
    created_at = db.Column(db.DateTime,server_default=func.now())
    is_white = db.Column(db.Boolean,default=True)
    draw = db.Column(db.Boolean,default=False)
    winner = db.Column(db.String,unique=False)