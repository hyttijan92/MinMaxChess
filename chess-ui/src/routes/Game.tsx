import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from "../components/Loading";
import Chessboard from 'chessboardjsx';
import { Chess, Move, Square } from "chess.js";
import Modal from '../components/Modal';
import GameOverDialog from '../components/GameOverDialog';
import { selectGameState, selectGameUIState, selectUserUUID, togglePromotionDialog, updateGame, storePendingMove,resign, draw, makeAIMove } from "../stores/rootStore";
import ErrorBar from "../components/ErrorBar";
import { IGameState, IPendingMove } from "../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../stores/hooks";


function Game() {

  const user_uuid = useAppSelector(selectUserUUID);
  const gameState: IGameState = useAppSelector(selectGameState) as IGameState;
  const gameUIState = useAppSelector(selectGameUIState);
  const [squareStyles, setSquareStyles] = useState({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function gameStart() {
      if (gameState && gameState.aiStarts) {
        dispatch(updateGame({ aiStarts: false }))
        dispatch(makeAIMove(user_uuid,gameState.id, new Chess(gameState.fen).fen()))
      }
    }
    gameStart();
  })

  const checkIfPromoted = (sourceSquare: string, targetSquare: string, piece: string) => {

    if (piece === 'wP') {
      const whitePromotionSquares = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8']
      if (whitePromotionSquares.includes(targetSquare)) {
        return true;
      }
    }
    else if (piece === 'bP') {
      const blackPromotionSquares = ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
      if (blackPromotionSquares.includes(targetSquare)) {
        return true;
      }
    }
    return false;
  }
  const handleDrop = ({sourceSquare, targetSquare, piece }:{sourceSquare: string, targetSquare: string, piece: string}) => {
    if (checkIfPromoted(sourceSquare, targetSquare, piece)) {

      dispatch(storePendingMove({ sourceSquare: sourceSquare, targetSquare: targetSquare }))
      dispatch(togglePromotionDialog(true))
    }
    else {
      movePiece(sourceSquare, targetSquare, undefined)
    }
    setSquareStyles({})
  }
  const choosePromotion = (promotion: string | undefined) => {
    dispatch(togglePromotionDialog(false))
    const pendingMove = gameState.pendingMove as IPendingMove
    movePiece(pendingMove.sourceSquare, pendingMove.targetSquare, promotion)
    dispatch(storePendingMove(undefined))
  }
  const movePiece = async (sourceSquare: string, targetSquare: string, promotion: string|undefined) => {
    try {
      const board = new Chess(gameState.fen)
      board.move({ from: sourceSquare, to: targetSquare, promotion: promotion })
      dispatch(updateGame({ fen: board.fen() }))
      dispatch(makeAIMove(user_uuid,gameState.id,board.fen()))
    }
    catch (e) {}
  }

  const handleOnMouseOverSquare = (square: Square) => {
    const board = new Chess(gameState.fen);
    let moves = board.moves({
      square: square,
      verbose: true
    });
    if (moves.length !== 0 && (new Chess(gameState.fen).turn() === 'w') === gameState.is_white) {
      const stylesForSquares = moves.reduce((acc: {[key :string] : {backgroundColor: string}}, curr: Move) => { acc[curr.to] = { backgroundColor: board.squareColor(curr.to) === 'light' ? 'yellow' : 'gold' }; return acc }, {})
      setSquareStyles(stylesForSquares)
    }
  }
  const handleResign = () =>{
    dispatch(resign(gameState.id))
  }
  const handleDraw = () =>{
    dispatch(draw(gameState.id))
  }


  return (
    <>
      <Header />
      {gameUIState.error && 
      <ErrorBar/>
      }
      {gameState ?
        <>
        <div className="container mx-auto grid justify-center">
          {gameUIState.showPromotionDialog &&
            <Modal choosePromotion={choosePromotion} />
          }
          {gameState.game_status === "ENDED" &&
            <GameOverDialog draw={gameState.draw} winner={gameState.winner} />
          }
          <Chessboard
            onDrop={handleDrop}
            position={new Chess(gameState.fen).fen()}
            orientation={gameState.is_white ? 'white' : 'black'}
            onMouseOverSquare={handleOnMouseOverSquare}
            onMouseOutSquare={() => setSquareStyles({})}
            squareStyles={squareStyles}
            draggable={(new Chess(gameState.fen).turn() === 'w') === gameState.is_white}
            calcWidth={({ screenWidth, screenHeight }) => { return screenWidth > screenHeight ? (screenHeight * 0.75) : (screenWidth * 0.75) }}
          />
          <button onClick={handleResign} className={'bg-gray-500 text-xl'}>Resign</button>
          {new Chess(gameState.fen).isDraw() &&<button onClick={handleDraw} className={'bg-gray-200 text-xl'}>Claim draw</button>}
        </div>
        <Loading/>
        </>
        :
        <Navigate to="/" replace />
      }
    </>
  );
}

export default Game;
