from models import Game, GameStatus, db


class GameService:

    @staticmethod
    def find_game_by_id(id):
        return Game.query.filter_by(id=id).first()

    @staticmethod
    def find_ended_games_by_page(page):
        return Game.query.filter_by(game_status=GameStatus.ENDED).order_by(Game.created_at.desc()).offset(int(page)*10).limit(10)

    @staticmethod
    def find_most_recent_ongoing_game_by_user_uuid(user_uuid):
        return Game.query.filter_by(user_uuid=user_uuid, game_status=GameStatus.ONGOING).order_by(Game.created_at.desc()).first()

    @staticmethod
    def create_game(new_game):
        game = Game(user_uuid=new_game['user_uuid'],
                    fen=new_game['fen'],
                    game_engine=new_game['game_engine'],
                    is_white=new_game['is_white']
                    )
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
                "game_engine": game.game_engine.value,
                "created_at": game.created_at,
                "is_white": game.is_white,
                "draw": game.draw,
                "winner": game.winner
                }

    @staticmethod
    def serialize_games(games):
        return list(map(GameService.serialize_game, games))
