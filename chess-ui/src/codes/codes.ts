export const heuristicMinMax : string =`    def heuristic(self, board: chess.Board):
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
        return white_score-black_score`


export const heuristicAlphaBeta : string = `
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

    return white_score-black_score`

export const decisionRandom : string = `def decide(self):
    moves = []
    for move in self.board.legal_moves:
        moves.append(move)
    self.board.push(moves[random.randint(0,len(moves)-1)])
    return self.board`