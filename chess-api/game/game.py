from engines import *
from models import GameEngine
import chess
class GameLoop:
    def play(self,user_uuid, board: chess.Board, Engine: AbstractEngine):

        if board.is_checkmate():
            return {"user_uuid": user_uuid,"fen": board.fen(), "is_checkmate": True, "is_stalemate": False, "winner": "White" if board.outcome().winner else "Black"}
        elif board.is_stalemate():
            return {"user_uuid": user_uuid,"fen": board.fen(), "is_checkmate": False, "is_stalemate": True, "winner": None}
        else:
            engine = Engine(board,False)
            board = engine.decide()
            if board.is_checkmate():
                return {"user_uuid": user_uuid,"fen": board.fen(), "is_checkmate": True, "is_stalemate": False, "winner":  "White" if board.outcome().winner else "Black"}
            elif board.is_stalemate():
                return {"user_uuid": user_uuid,"fen": board.fen(), "is_checkmate": False, "is_stalemate": True, "winner": None}
            else:
                return {"user_uuid": user_uuid, "fen": board.fen(), "is_checkmate": False, "is_stalemate": False, "winner": None}
    def chooseEngine(game):
        engine = None
        if game.game_engine == GameEngine.ALPHABETA:
            engine = AlphaBetaEngine
        elif game.game_engine == GameEngine.MINMAX:
            engine = MinMaxEngine
        else:
            engine = RandomEngine
        return engine