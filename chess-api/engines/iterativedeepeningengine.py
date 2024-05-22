from . import AbstractEngine
from . import AlphaBetaEngine
import chess
import datetime
import copy 
class IterativeDeepeningEngine(AbstractEngine):

    def __init__(self, board=..., is_white=True,depth=100):
         super().__init__(board, is_white)
         self.depth = 1
         self.max_depth = depth
    
    
    def decide(self):
        start = datetime.datetime.now()
        board = None

        for i in range(self.depth,self.max_depth):
            agent = AlphaBetaEngine(copy.deepcopy(self.board),self.is_white,i)
            board = agent.decide()
            end = datetime.datetime.now()
            if((end-start).total_seconds() > 5):
                print((end-start).total_seconds())
                break
        
        return board
