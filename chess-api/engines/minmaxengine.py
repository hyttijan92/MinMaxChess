from . import AbstractEngine
import chess
CHESS_PIECE_VALUES = {
    chess.PAWN: 1,
    chess.KNIGHT:3,
    chess.BISHOP:3,
    chess.ROOK: 5,
    chess.QUEEN: 8,
    chess.KING: 9999
}
class MinMaxEngine(AbstractEngine):
    def __init__(self, board=..., is_white=True,depth=2):
         super().__init__(board, is_white)
         self.depth = depth
    def decide(self):
        if self.is_white:
            max_value = -9999999
            max_move = None
            for move in self.board.legal_moves:
                self.board.push(move)
                value = self.minmax(self.board,self.depth,False)
                if value > max_value or max_move == None:
                    max_value = value
                    max_move = move
                self.board.pop()
            self.board.push(max_move)
            return self.board
        else:
            min_value = 9999999
            min_move = None
            for move in self.board.legal_moves:
                self.board.push(move)
                value = self.minmax(self.board,self.depth,True)
                if value < min_value or min_move == None:
                    min_value = value
                    min_move = move
                    print(min_value)
                self.board.pop()
            self.board.push(min_move)
            return self.board
    def minmax(self,board: chess.Board, depth, is_player_maximizing):
        if depth == 0 or board.is_game_over():
            return self.heuristic(board)
        elif is_player_maximizing:
            max_value = -9999999
            for move in board.legal_moves:
                board.push(move)
                max_value = max(max_value,self.minmax(board,depth-1,False))
                board.pop()
            return max_value
        else:
            min_value = 9999999
            for move in board.legal_moves:
                board.push(move)
                min_value = min(min_value,self.minmax(board,depth-1,True))
                board.pop()
            return min_value

    def heuristic(self, board: chess.Board):
        white_score = 0
        black_score = 0
        if board.is_checkmate():
            if board.outcome().winner == chess.WHITE:
                return 9999999
            else:
                return -9999999
        elif board.is_stalemate() or board.is_insufficient_material():
            return 0
        for square in chess.SQUARES:
            piece = board.piece_at(square)
            if piece is not None:
                if piece.color == chess.WHITE:
                    white_score += CHESS_PIECE_VALUES[piece.piece_type]
                else:
                    black_score += CHESS_PIECE_VALUES[piece.piece_type]
        return white_score-black_score