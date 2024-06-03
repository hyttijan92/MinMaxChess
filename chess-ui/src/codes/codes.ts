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
export const heuristicIterativeDeepening: string = `
def heuristic(self, board: chess.Board):
    game_phase = 0
    game_phase_inc = [0, 1, 1, 2, 4, 0]
    middle_game_white_score = 0
    end_game_white_score = 0
    middle_game_black_score = 0
    end_game_black_score = 0
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
            game_phase += game_phase_inc[piece.piece_type-1]
            if piece.color == chess.WHITE:
                middle_game_white_score += MID_GAME_CHESS_PIECE_VALUES[piece.piece_type]
                end_game_white_score += END_GAME_CHESS_PIECE_VALUES[piece.piece_type]
                if (piece.piece_type == chess.PAWN):
                    middle_game_white_score += MID_GAME_PAWN_PIECE_SQUARE_TABLES_WHITE[square]
                    end_game_white_score += END_GAME_PAWN_PIECE_SQUARE_TABLES_WHITE[square]
                elif (piece.piece_type == chess.KNIGHT):
                    middle_game_white_score += MID_GAME_KNIGHT_PIECE_SQUARE_TABLES_WHITE[square]
                    end_game_white_score += END_GAME_KNIGHT_PIECE_SQUARE_TABLES_WHITE[square]
                elif (piece.piece_type == chess.BISHOP):
                    middle_game_white_score += MID_GAME_BISHOP_PIECE_SQUARE_TABLES_WHITE[square]
                    end_game_white_score += END_GAME_BISHOP_PIECE_SQUARE_TABLES_WHITE[square]
                elif (piece.piece_type == chess.ROOK):
                    middle_game_white_score += MID_GAME_ROOK_PIECE_SQUARE_TABLES_WHITE[square]
                    end_game_white_score += END_GAME_ROOK_PIECE_SQUARE_TABLES_WHITE[square]
                elif (piece.piece_type == chess.QUEEN):
                    middle_game_white_score += MID_GAME_QUEEN_PIECE_SQUARE_TABLES_WHITE[square]
                    end_game_white_score += END_GAME_QUEEN_PIECE_SQUARE_TABLES_WHITE[square]
                elif (piece.piece_type == chess.KING):
                    middle_game_white_score += MID_GAME_KING_PIECE_SQUARE_TABLES_WHITE[square]
                    end_game_white_score += END_GAME_KING_PIECE_SQUARE_TABLES_WHITE[square]
            else:
                middle_game_black_score += MID_GAME_CHESS_PIECE_VALUES[piece.piece_type]
                end_game_black_score += END_GAME_CHESS_PIECE_VALUES[piece.piece_type]
                if (piece.piece_type == chess.PAWN):
                    middle_game_black_score += MID_GAME_PAWN_PIECE_SQUARE_TABLES_BLACK[square]
                    end_game_black_score += END_GAME_PAWN_PIECE_SQUARE_TABLES_BLACK[square]
                elif (piece.piece_type == chess.KNIGHT):
                    middle_game_black_score += MID_GAME_KNIGHT_PIECE_SQUARE_TABLES_BLACK[square]
                    end_game_black_score += END_GAME_KNIGHT_PIECE_SQUARE_TABLES_BLACK[square]
                elif (piece.piece_type == chess.BISHOP):
                    middle_game_black_score += MID_GAME_BISHOP_PIECE_SQUARE_TABLES_BLACK[square]
                    end_game_black_score += END_GAME_BISHOP_PIECE_SQUARE_TABLES_BLACK[square]
                elif (piece.piece_type == chess.ROOK):
                    middle_game_black_score += MID_GAME_ROOK_PIECE_SQUARE_TABLES_BLACK[square]
                    end_game_black_score += END_GAME_ROOK_PIECE_SQUARE_TABLES_BLACK[square]
                elif (piece.piece_type == chess.QUEEN):
                    middle_game_black_score += MID_GAME_QUEEN_PIECE_SQUARE_TABLES_BLACK[square]
                    end_game_black_score += END_GAME_QUEEN_PIECE_SQUARE_TABLES_BLACK[square]
                elif (piece.piece_type == chess.KING):
                    middle_game_black_score += MID_GAME_KING_PIECE_SQUARE_TABLES_BLACK[square]
                    end_game_black_score += END_GAME_KING_PIECE_SQUARE_TABLES_BLACK[square]
    middle_game_phase = game_phase
    if middle_game_phase > 24:
        middle_game_phase = 24
    end_game_phase = 24-middle_game_phase
    mid_score = middle_game_white_score-middle_game_black_score
    end_score = end_game_white_score-end_game_black_score
    return mid_score*middle_game_phase + end_score * end_game_phase`

export const decisionRandom : string = `def decide(self):
    moves = []
    for move in self.board.legal_moves:
        moves.append(move)
    self.board.push(moves[random.randint(0,len(moves)-1)])
    return self.board`