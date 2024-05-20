from abstractengine import AbstractEngine
from alphabetaengine import AlphaBetaEngine
import chess

class IterativeDeepeningEngine(AbstractEngine):

    def __init__(self, board=..., is_white=True,depth=3):
         super().__init__(board, is_white)
         self.depth = 1
         self.max_depth = depth
    
    
    def decide(self):
        for i in range(self.depth,self.max_depth):
            agent = AlphaBetaEngine(self.board,self.is_white,i)
            yield agent.decide()
