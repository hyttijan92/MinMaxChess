from flask import Flask,request,jsonify,Response
import os
import chess
from models import db,GameStatus
from game import GameLoop;
from services import GameService
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")

db.init_app(app)


@app.route("/current_game/<user_uuid>", methods=['GET'])
def current_game(user_uuid):
    current_game = GameService.find_most_recent_ongoing_game_by_user_uuid(user_uuid)
    if current_game != None:
        game_json = GameService.serialize_game(current_game)
        return jsonify(game_json)
    else:
        return Response(status=404)
    
@app.route("/previous_games",methods=['GET'])
def previous_games():
    page = request.args.get("page")
    games = GameService.find_ended_games_by_page(page)
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
    if result["draw"] or result["winner"] != None:
        game.game_status = GameStatus.ENDED
        game.draw = result["draw"]
        if result["winner"] != None:
            if (result["winner"] == "White" and game.is_white) or (result["winner"] == "Black" and not game.is_white):
                game.winner = game.user_uuid
            else:
                game.winner = game.game_engine.value
       
    db.session.commit()
    return jsonify(GameService.serialize_game(game))

@app.route("/resign", methods=['POST'])
def resign():
    content = request.json
    game = GameService.find_game_by_id(content['game_id'])
    game.game_status = GameStatus.ENDED
    game.winner = game.game_engine.value
    db.session.commit() 
    return jsonify(GameService.serialize_game(game))
    
if __name__ == "__main__":

    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=8000, debug=True)