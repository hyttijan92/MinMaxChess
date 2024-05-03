from engines import AbstractEngine
import chess
class Game:
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
