import chess.svg

def save_svg(board,file_name):
    board_svg = chess.svg.board(board)
    outputfile = open(file_name,"w")
    outputfile.write(board_svg)
    outputfile.close()