import chess
import utils
import engines


board = chess.Board("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
counter = 0
for i in range(0,100):
    board = engines.IterativeDeepeningEngine.decide(board)
    utils.save_svg(board, counter)
    counter += 1
    board = engines.AlphaBetaEngine.decide(board)
    utils.save_svg(board, counter)
    counter += 1

