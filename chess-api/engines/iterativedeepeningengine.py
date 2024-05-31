from . import AbstractEngine
import chess
import copy
import random
import threading
from functools import partial

CHESS_PIECE_VALUES = {
    chess.PAWN: 100,
    chess.KNIGHT: 300,
    chess.BISHOP: 300,
    chess.ROOK: 500,
    chess.QUEEN: 900,
    chess.KING: 99999
}

PAWN_PIECE_SQUARE_TABLES_BLACK = [0,  0,  0,  0,  0,  0,  0,  0,
                                  50, 50, 50, 50, 50, 50, 50, 50,
                                  10, 10, 20, 30, 30, 20, 10, 10,
                                  5,  5, 10, 25, 25, 10,  5,  5,
                                  0,  0,  0, 20, 20,  0,  0,  0,
                                  5, -5, -10,  0,  0, -10, -5,  5,
                                  5, 10, 10, -20, -20, 10, 10,  5,
                                  0,  0,  0,  0,  0,  0,  0,  0]
PAWN_PIECE_SQUARE_TABLES_WHITE = PAWN_PIECE_SQUARE_TABLES_BLACK[::-1]
KNIGHT_PIECE_SQUARE_TABLES_BLACK = [-50, -40, -30, -30, -30, -30, -40, -50,
                                    -40, -20,  0,  0,  0,  0, -20, -40,
                                    -30,  0, 10, 15, 15, 10,  0, -30,
                                    -30,  5, 15, 20, 20, 15,  5, -30,
                                    -30,  0, 15, 20, 20, 15,  0, -30,
                                    -30,  5, 10, 15, 15, 10,  5, -30,
                                    -40, -20,  0,  5,  5,  0, -20, -40,
                                    -50, -40, -30, -30, -30, -30, -40, -50]
KNIGHT_PIECE_SQUARE_TABLES_WHITE = KNIGHT_PIECE_SQUARE_TABLES_BLACK[::-1]
BISHOP_PIECE_SQUARE_TABLES_BLACK = [-20, -10, -10, -10, -10, -10, -10, -20,
                                    -10,  0,  0,  0,  0,  0,  0, -10,
                                    -10,  0,  5, 10, 10,  5,  0, -10,
                                    -10,  5,  5, 10, 10,  5,  5, -10,
                                    -10,  0, 10, 10, 10, 10,  0, -10,
                                    -10, 10, 10, 10, 10, 10, 10, -10,
                                    -10,  5,  0,  0,  0,  0,  5, -10,
                                    -20, -10, -10, -10, -10, -10, -10, -20]

BISHOP_PIECE_SQUARE_TABLES_WHITE = BISHOP_PIECE_SQUARE_TABLES_BLACK[::-1]
ROOK_PIECE_SQUARE_TABLES_BLACK = [0,  0,  0,  0,  0,  0,  0,  0,
                                  5, 10, 10, 10, 10, 10, 10,  5,
                                  -5,  0,  0,  0,  0,  0,  0, -5,
                                  -5,  0,  0,  0,  0,  0,  0, -5,
                                  -5,  0,  0,  0,  0,  0,  0, -5,
                                  -5,  0,  0,  0,  0,  0,  0, -5,
                                  -5,  0,  0,  0,  0,  0,  0, -5,
                                  0,  0,  0,  5,  5,  0,  0,  0]
ROOK_PIECE_SQUARE_TABLES_WHITE = ROOK_PIECE_SQUARE_TABLES_BLACK[::-1]

class IterativeDeepeningEngine(AbstractEngine):

    def __init__(self, board: chess.Board, is_white=True, depth=100):
        super().__init__(board, is_white)
        self.timeout = False
        self.depth = 3
        self.max_depth = depth

    def timeout_occured(self):
        self.timeout = True

    def decide(self):
        board = None
        try:
            timer = threading.Timer(10.0, self.timeout_occured)
            timer.start()
            for i in range(self.depth, self.max_depth):
                board = self.search(copy.deepcopy(self.board), self.is_white, i)
            timer.cancel()
            return board
        except TimeoutError:
            if board is None:
                move = list(board.legal_moves)[0]
                board.push(move)
                return board
            else:
                return board
    
    def search(self, board: chess.Board, is_white: bool, depth: int):
        alpha = -99999999
        beta = 99999999
        legal_moves = list(board.legal_moves)
        sort_initial_moves_partial = partial(self.sort_initial_moves, board)
        random.shuffle(legal_moves)
        if is_white:
            max_value = -99999999
            max_move = None
            legal_moves.sort(reverse=True, key=sort_initial_moves_partial)
            for move in legal_moves:
                board.push(move)
                value = self.alphabeta(board, depth-1, alpha, beta, False)
                if value > max_value or max_move == None:
                    max_value = value
                    max_move = move
                board.pop()
                if max_value > beta:
                    break
                alpha = max(alpha, max_value)
            board.push(max_move)
            return board
        else:
            min_value = 99999999
            min_move = None
            legal_moves.sort(reverse=False, key=sort_initial_moves_partial)
            for move in legal_moves:
                board.push(move)
                value = self.alphabeta(board, depth-1, alpha, beta, True)
                if value < min_value or min_move == None:
                    min_value = value
                    min_move = move
                board.pop()
                if min_value < alpha:
                    break
                beta = min(beta, min_value)
            board.push(min_move)
            return board
                   
    def sort_initial_moves(self, board: chess.Board, move: chess.Move) -> int:
        board.push(move)
        result = self.heuristic(board)
        board.pop()
        return result
    
    def alphabeta(self, board: chess.Board, depth, alpha, beta, is_player_maximizing):
        if self.timeout:
            raise TimeoutError
        elif depth == 0 or board.is_game_over():
            if is_player_maximizing:
                return self.heuristic(board) - depth
            else:
                return self.heuristic(board) + depth
        elif is_player_maximizing:
            max_value = -99999999
            for move in board.legal_moves:
                board.push(move)
                max_value = max(max_value, self.alphabeta(
                    board, depth-1, alpha, beta, False))
                board.pop()
                if max_value > beta:
                    break
                alpha = max(alpha, max_value)
            return max_value
        else:
            min_value = 99999999
            for move in board.legal_moves:
                board.push(move)
                min_value = min(min_value, self.alphabeta(
                    board, depth-1, alpha, beta, True))
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
                    if (piece.piece_type == chess.PAWN):
                        white_score += PAWN_PIECE_SQUARE_TABLES_WHITE[square]
                    elif (piece.piece_type == chess.KNIGHT):
                        white_score += KNIGHT_PIECE_SQUARE_TABLES_WHITE[square]
                    elif (piece.piece_type == chess.BISHOP):
                        white_score += BISHOP_PIECE_SQUARE_TABLES_WHITE[square]
                    elif (piece.piece_type == chess.ROOK):
                        white_score += ROOK_PIECE_SQUARE_TABLES_WHITE[square]
                else:
                    black_score += CHESS_PIECE_VALUES[piece.piece_type]
                    if (piece.piece_type == chess.PAWN):
                        black_score += PAWN_PIECE_SQUARE_TABLES_BLACK[square]
                    elif (piece.piece_type == chess.KNIGHT):
                        black_score += KNIGHT_PIECE_SQUARE_TABLES_BLACK[square]
                    elif (piece.piece_type == chess.BISHOP):
                        black_score += BISHOP_PIECE_SQUARE_TABLES_BLACK[square]
                    elif (piece.piece_type == chess.ROOK):
                        black_score += ROOK_PIECE_SQUARE_TABLES_BLACK[square]

        return white_score-black_score
