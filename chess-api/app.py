from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import os
from engines import RandomEngine
from engines import MinMaxEngine
from engines import AlphaBetaEngine
import chess
from game import Game;
app = Flask(__name__)
#r = redis.Redis(host='redis',port=6379)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
db = SQLAlchemy(app)
from services import game_service

@app.route("/")
def hello_world():
    print(game_service.find_games_by_user_uuid("TEST"))
    return "<p>Hello, World!</p>"


@app.route("/move", methods=['POST'])
def move():
    content = request.json;
    game = Game()
    result = game.play(content.get('user_uuid'),chess.Board(content.get('fen')),AlphaBetaEngine)
    return jsonify(result)

    
if __name__ == "__main__":

    app.run(host="0.0.0.0", port=8000, debug=True)