from models import Game

def find_games_by_user_uuid(user_uuid):
    return Game.query.all()