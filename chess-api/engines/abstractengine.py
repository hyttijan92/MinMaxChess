from abc import ABC, abstractmethod
import chess
class AbstractEngine(ABC):

    @abstractmethod
    def __init__(self,board = chess.Board(),is_white=True):
        self.board = board
        self.is_white = is_white
    
    @abstractmethod
    def decide(self):
        pass
