from flask import Flask,request,jsonify,Response
import os
import chess
from models import db,GameStatus
from game import GameLoop;
from services import GameService
app = Flask(__name__)
#r = redis.Redis(host='redis',port=6379)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")

db.init_app(app)


@app.route("/current_game/<user_uuid>", methods=['GET'])
def current_game(user_uuid):
    current_game = GameService.find_most_recent_ongoing_game_by_user_uuid(user_uuid)
    if current_game != None:
        game_json = GameService.serialize_game(current_game)
        return jsonify(game_json)
    else:
        return None
    
@app.route("/previous_games/<user_uuid>",methods=['GET'])
def previous_games(user_uuid):
    games = GameService.find_games_by_user_uuid(user_uuid)
    games_json = GameService.serialize_games(games)
    return jsonify(games_json)


@app.route("/create_game", methods=['POST'])
def create_game():
    new_game = request.json
    print(new_game)
    game = GameService.create_game(new_game)
    game_json = GameService.serialize_game(game)
    if(game):
        return jsonify(game_json)
    else:
        return Response(status=400)
    
@app.route("/move", methods=['POST'])
def move():
    move = request.json;
    game = GameService.find_game_by_id(move['game_id'])
    gameloop = GameLoop()
    result = gameloop.play(chess.Board(move.get('fen')), not game.is_white, gameloop.chooseEngine(game))
    game.fen = result["fen"]
    game.draw = result["draw"]
    game.winner = result["winner"]
    if game.draw or game.winner != None:
        game.game_status = GameStatus.ENDED
    db.session.commit()
    return jsonify(GameService.serialize_game(game))


    
if __name__ == "__main__":

    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=8000, debug=True)