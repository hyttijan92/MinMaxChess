from models import Game,db

class GameService:

    @staticmethod
    def find_game_by_id(id):
        return Game.query.filter_by(id=id).first()
    @staticmethod
    def find_games_by_user_uuid(user_uuid):
        return Game.query.filter_by(user_uuid=user_uuid).all()

    @staticmethod
    def create_game(new_game):
        game = Game(user_uuid=new_game['user_uuid'],fen=new_game['fen'],game_engine=new_game['game_engine'],is_white=new_game['is_white'])
        db.session.add(game)
        db.session.commit()
        return GameService.find_game_by_id(game.id)
    
    @staticmethod
    def serialize_game(game):
        return {
                "id": game.id,
                "user_uuid": game.user_uuid,
                "fen": game.fen,
                "game_status": game.game_status.value,
                "game_engine":game.game_engine.value,
                "created_at": game.created_at,
                "is_white":game.is_white,
                "draw": game.draw,
                "winner": game.winner
                }
    @staticmethod
    def serialize_games(games):
        return list(map(GameService.serialize_game,games))