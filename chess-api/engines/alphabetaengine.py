from . import AbstractEngine
import chess
import random
CHESS_PIECE_VALUES = {
    chess.PAWN: 100,
    chess.KNIGHT:300,
    chess.BISHOP:300,
    chess.ROOK: 500,
    chess.QUEEN: 900,
    chess.KING: 99999
}
PAWN_PIECE_SQUARE_TABLES = [ 0,  0,  0,  0,  0,  0,  0,  0,
                      50, 50, 50, 50, 50, 50, 50, 50,
                      10, 10, 20, 30, 30, 20, 10, 10,
                      5,  5, 10, 25, 25, 10,  5,  5,
                      0,  0,  0, 20, 20,  0,  0,  0,
                      5, -5,-10,  0,  0,-10, -5,  5,
                      5, 10, 10,-20,-20, 10, 10,  5,
                      0,  0,  0,  0,  0,  0,  0,  0]
KNIGHT_PIECE_SQUARE_TABLES = [-50,-40,-30,-30,-30,-30,-40,-50,
                              -40,-20,  0,  0,  0,  0,-20,-40,
                              -30,  0, 10, 15, 15, 10,  0,-30,
                              -30,  5, 15, 20, 20, 15,  5,-30,
                              -30,  0, 15, 20, 20, 15,  0,-30,
                              -30,  5, 10, 15, 15, 10,  5,-30,
                              -40,-20,  0,  5,  5,  0,-20,-40,
                              -50,-40,-30,-30,-30,-30,-40,-50]
BISHOP_PIECE_SQUARE_TABLES = [-20,-10,-10,-10,-10,-10,-10,-20,
-10,  0,  0,  0,  0,  0,  0,-10,
-10,  0,  5, 10, 10,  5,  0,-10,
-10,  5,  5, 10, 10,  5,  5,-10,
-10,  0, 10, 10, 10, 10,  0,-10,
-10, 10, 10, 10, 10, 10, 10,-10,
-10,  5,  0,  0,  0,  0,  5,-10,
-20,-10,-10,-10,-10,-10,-10,-20]
ROOK_PIECE_SQUARE_TABLES = [  0,  0,  0,  0,  0,  0,  0,  0,
  5, 10, 10, 10, 10, 10, 10,  5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
  0,  0,  0,  5,  5,  0,  0,  0]
class AlphaBetaEngine(AbstractEngine):
    def __init__(self, board=..., is_white=True,depth=2):
         super().__init__(board, is_white)
         self.depth = depth
         self.counter = 0
    def decide(self):
        alpha = -9999999
        beta = 9999999
        legal_moves = list(self.board.legal_moves)
        random.shuffle(legal_moves)
        if self.is_white:
            max_value = -9999999
            max_move = None
            for move in legal_moves:
                self.board.push(move)
                value = self.alphabeta(self.board,self.depth,alpha,beta,False)
                if value > max_value or max_move == None:
                    max_value = value
                    max_move = move
                self.board.pop()
                if max_value > beta:
                    break
                alpha = max(alpha,max_value)
            self.board.push(max_move)
            print("ab counter:{}".format(self.counter))
            return self.board
        else:
            min_value = 9999999
            min_move = None
            for move in legal_moves:
                self.board.push(move)
                value = self.alphabeta(self.board,self.depth,-9999999,9999999,True)
                if value < min_value or min_move == None:
                    min_value = value
                    min_move = move
                    print(min_value)
                self.board.pop()
                if min_value < alpha:
                    break
                beta = min(beta,min_value)
            self.board.push(min_move)
            print("ab counter:{}".format(self.counter))
            return self.board
    def alphabeta(self,board: chess.Board, depth, alpha,beta, is_player_maximizing):
        if depth == 0 or board.is_game_over():
            self.counter+=1
            return self.heuristic(board)
        elif is_player_maximizing:
            max_value = -9999999
            for move in board.legal_moves:
                board.push(move)
                max_value = max(max_value,self.alphabeta(board,depth-1, alpha,beta,False))
                board.pop()
                if max_value > beta:
                    break
                alpha = max(alpha,max_value)
            return max_value
        else:
            min_value = 9999999
            for move in board.legal_moves:
                board.push(move)
                min_value = min(min_value,self.alphabeta(board,depth-1,alpha,beta,True))
                board.pop()
                if min_value < alpha:
                    break
                beta = min(beta, min_value)
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
                    if(piece.piece_type == chess.PAWN):
                        white_score+=PAWN_PIECE_SQUARE_TABLES[square]
                    elif(piece.piece_type == chess.KNIGHT):
                        white_score+=KNIGHT_PIECE_SQUARE_TABLES[square]
                    elif(piece.piece_type == chess.BISHOP):
                        white_score+=BISHOP_PIECE_SQUARE_TABLES[square]
                    elif(piece.piece_type == chess.ROOK):
                        white_score+=ROOK_PIECE_SQUARE_TABLES[square]
                else:
                    black_score += CHESS_PIECE_VALUES[piece.piece_type]
                    if(piece.piece_type == chess.PAWN):
                        black_score+=PAWN_PIECE_SQUARE_TABLES[square]
                    elif(piece.piece_type == chess.KNIGHT):
                        black_score+=KNIGHT_PIECE_SQUARE_TABLES[square]
                    elif(piece.piece_type == chess.BISHOP):
                        black_score+=BISHOP_PIECE_SQUARE_TABLES[square]
                    elif(piece.piece_type == chess.ROOK):
                        black_score+=ROOK_PIECE_SQUARE_TABLES[square]

        return white_score-black_score