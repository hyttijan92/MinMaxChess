import unittest
import engines
import chess

class TestEngine(unittest.TestCase):
   
    def test_engine_position_1_w(self):
        test_position = "k7/8/8/8/8/8/2R5/1R2K3 w - - 0 1"
        board = chess.Board(test_position)
        engine = engines.AlphaBetaEngine(board,is_white=True,depth=3)
        new_board = engine.decide()
        self.assertEqual(new_board.fen(),"k7/8/8/8/8/8/R7/1R2K3 b - - 1 1")
     
    
    def test_engine_position_2_w(self):
        test_position = "1k6/8/8/8/8/2R5/3R4/4K3 w - - 0 1"
        board = chess.Board(test_position)
        engine = engines.AlphaBetaEngine(board,is_white=True,depth=5)
        new_board = engine.decide()
        test_f = lambda b: b == "1k6/3R4/8/8/8/2R5/8/4K3 b - - 1 1" or b == "1k6/8/8/8/8/2R5/1R6/4K3 b - - 1 1" 
        self.assertTrue(test_f(new_board.fen()),"Correct move was not made:1k6/3R4/8/8/8/2R5/8/4K3 b - - 1 1 or 1k6/8/8/8/8/2R5/1R6/4K3 b - - 1 1")
    
    def test_engine_position_3_w(self):
        test_position = "8/2k5/8/8/8/4R3/3R4/4K3 w - - 0 1"
        board = chess.Board(test_position)
        engine = engines.AlphaBetaEngine(board,is_white=True,depth=5)
        new_board = engine.decide()
        self.assertEqual(new_board.fen(),"8/2k5/8/8/8/2R5/3R4/4K3 b - - 1 1")
       
    def test_engine_position_4_w(self):
        test_position = "6n1/5R2/4k1P1/2Q5/1nK5/8/8/8 w - - 0 1"
        board = chess.Board(test_position)
        engine = engines.AlphaBetaEngine(board,is_white=True,depth=4)
        new_board = engine.decide()
        self.assertEqual(new_board.fen(),"6n1/5R2/4k1P1/8/1nKQ4/8/8/8 b - - 1 1")
    
    def test_engine_position_1_b(self):
        test_position = "4k3/5r2/6r1/8/8/8/8/7K b - - 0 1"
        board = chess.Board(test_position)
        engine = engines.AlphaBetaEngine(board,is_white=False,depth=3)
        new_board = engine.decide()
        self.assertEqual(new_board.fen(),"4k3/7r/6r1/8/8/8/8/7K w - - 1 2")
     
    
    def test_engine_position_2_b(self):
        test_position = "3k4/4r3/5r2/8/8/8/8/6K1 b - - 0 1"
        board = chess.Board(test_position)
        engine = engines.AlphaBetaEngine(board,is_white=False,depth=5)
        new_board = engine.decide()
        test_f = lambda b: b == "3k4/8/5r2/8/8/8/4r3/6K1 w - - 1 2" or b == "3k4/6r1/5r2/8/8/8/8/6K1 w - - 1 2"
        self.assertTrue(test_f(new_board.fen()),"Correct move was not made:3k4/8/5r2/8/8/8/4r3/6K1 w - - 1 2 or 3k4/6r1/5r2/8/8/8/8/6K1 w - - 1 2")


    def test_engine_position_3_b(self):
        test_position = "4k3/3r4/4r3/8/8/8/2K5/8 b - - 0 1"
        board = chess.Board(test_position)
        engine = engines.AlphaBetaEngine(board,is_white=False,depth=5)
        new_board = engine.decide()
        self.assertEqual(new_board.fen(),"4k3/3r4/2r5/8/8/8/2K5/8 w - - 1 2")


if __name__ == '__main__':
    unittest.main()