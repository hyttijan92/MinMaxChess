from engines import (
    AbstractEngine,
    AlphaBetaEngine,
    MinMaxEngine,
    RandomEngine,
    IterativeDeepeningEngine
)
from models import GameEngine
import chess


class GameLoop:

    def play(self, board: chess.Board, engine_is_white, Engine: AbstractEngine):
        status = self.check_status_of_game(board)
        if status["draw"] is False and status["winner"] is None:
            engine = Engine(board, engine_is_white)
            board = engine.decide()
        return self.check_status_of_game(board)

    def check_status_of_game(self, board: chess.Board):
        if board.is_checkmate():
            return {"fen": board.fen(), "is_checkmate": True, "draw": False, "winner": "White" if board.outcome().winner else "Black"}
        elif board.is_stalemate():
            return {"fen": board.fen(), "is_checkmate": False, "draw": True, "winner": None}
        else:
            return {"fen": board.fen(), "is_checkmate": False, "draw": False, "winner": None}

    def chooseEngine(self, game):
        engine = None
        if game.game_engine == GameEngine.ITERATIVEDEEPENING:
            engine = IterativeDeepeningEngine
        elif game.game_engine == GameEngine.ALPHABETA:
            engine = AlphaBetaEngine
        elif game.game_engine == GameEngine.MINMAX:
            engine = MinMaxEngine
        else:
            engine = RandomEngine
        return engine
