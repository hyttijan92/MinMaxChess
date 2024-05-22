from . import AbstractEngine
import random


class RandomEngine(AbstractEngine):

    def __init__(self, board=..., is_white=True):
        super().__init__(board, is_white)

    def decide(self):
        moves = []
        for move in self.board.legal_moves:
            moves.append(move)
        self.board.push(moves[random.randint(0, len(moves)-1)])
        return self.board
