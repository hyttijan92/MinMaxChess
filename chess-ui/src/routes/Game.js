import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Header from '../components/Header';
import Chessboard from 'chessboardjsx';
import { Chess } from "chess.js";
import Modal from '../components/Modal';
import GameOverDialog from '../components/GameOverDialog';
import { selectGameState, selectGameUIState, selectUserUUID, toggle_promotion_dialog, update_game, store_pending_move,resign, makeAIMove } from "../stores/rootStore";


function Game() {

  const user_uuid = useSelector(selectUserUUID);
  const gameState = useSelector(selectGameState);
  const gameUIState = useSelector(selectGameUIState);
  const [squareStyles, setSquareStyles] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function gameStart() {
      if (gameState && gameState.ai_starts) {
        dispatch(update_game({ ai_starts: false }))
        dispatch(makeAIMove(user_uuid,gameState.id, new Chess(gameState.fen).fen()))
      }
    }
    gameStart();
  })

  const checkIfPromoted = (sourceSquare, targetSquare, piece) => {

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
  const handleDrop = ({ sourceSquare, targetSquare, piece }) => {
    if (checkIfPromoted(sourceSquare, targetSquare, piece)) {

      dispatch(store_pending_move({ sourceSquare: sourceSquare, targetSquare: targetSquare }))
      dispatch(toggle_promotion_dialog({ showPromotionDialog: true }))
    }
    else {
      movePiece(sourceSquare, targetSquare, null)
    }
    setSquareStyles({})
  }
  const choosePromotion = (promotion) => {
    dispatch(toggle_promotion_dialog({ showPromotionDialog: false }))
    movePiece(gameState.pendingMove.sourceSquare, gameState.pendingMove.targetSquare, promotion)
    dispatch(store_pending_move(null))
  }
  const movePiece = async (sourceSquare, targetSquare, promotion = null) => {
    try {
      const board = new Chess(gameState.fen)
      board.move({ from: sourceSquare, to: targetSquare, promotion: promotion })
      dispatch(update_game({ fen: board.fen() }))
      dispatch(makeAIMove(user_uuid,gameState.id,board.fen()))
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleOnMouseOverSquare = (square) => {
    const board = new Chess(gameState.fen);
    let moves = board.moves({
      square: square,
      verbose: true
    });
    if (moves.length !== 0) {
      const stylesForSquares = moves.reduce((acc, curr) => { acc[curr.to] = { backgroundColor: board.squareColor(curr.to) === 'light' ? 'yellow' : 'gold' }; return acc }, {})
      setSquareStyles(stylesForSquares)
    }
  }
  const handleResign = () =>{
    dispatch(resign(gameState.id))
  }


  return (
    <>
      <Header />
      {gameState ?
        
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
        </div>
        :
        <Navigate to="/" replace />
      }
    </>
  );
}

export default Game;
