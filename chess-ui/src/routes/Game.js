import '../App.css';
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Header from '../components/Header';
import Chessboard from 'chessboardjsx';
import  {Chess} from "chess.js";
import Modal from '../components/Modal';
import GameOverDialog from '../components/GameOverDialog';
import {selectGameState, selectUserUUID, store,toggle_promotion_dialog,update_game} from "../stores/rootStore";
import * as api from "../api/api.js";

function Game() {
  const user_uuid = useSelector(selectUserUUID);
  const gameState = useSelector(selectGameState);
  const [board,setBoard] = useState(new Chess(gameState.fen));
  const [squareStyles,setSquareStyles] = useState({});
  const dispatch = useDispatch();
  /**
  useEffect(() =>{
    console.log(game)
    if(gameState.is_white){
      fetchAIMove();
    }
  },[])
  */
  const handleDrop = ({sourceSquare, targetSquare,piece}) =>{
    //if(checkIfPromoted(sourceSquare,targetSquare,piece)){

    //}
    //else{
      movePiece(sourceSquare,targetSquare,'q')
    //}
    
  }
  const choosePromotion  = (promotion) =>{

    dispatch(toggle_promotion_dialog({showPromotionDialog:false}))
    movePiece()
  }
  const movePiece = async(sourceSquare, targetSquare, promotion = null) =>{
    try{
   
      board.move({from: sourceSquare, to:targetSquare,promotion: promotion})    
      const game = await api.makeGameMoveApi(user_uuid,gameState.id,board.fen())
      setBoard(new Chess(game.fen));
      dispatch(update_game(game))

    }
    catch(e){
      console.log(e);
    } 
  }

  const handleOnMouseOverSquare = (square) =>{
    let moves = board.moves({
      square: square,
      verbose: true
    });
    if(moves.length !== 0){
      showPossibleMoves(square,moves)
    }
  }
  const showPossibleMoves = (square,moves) =>{
    console.log(moves)
    const stylesForSquares = moves.reduce((acc,curr) =>{acc[curr.to]={backgroundColor:'yellow'}; return acc} ,{})
    setSquareStyles(stylesForSquares)

  }
  
  return (
    <>
      <Header/>
    <div className="container mx-auto">
      {store.getState().showPromotionDialog &&
      <Modal choosePromotion={choosePromotion}/>
      }
      {gameState.game_status === "ENDED" &&
      <GameOverDialog draw={gameState.draw} winner={gameState.winner}/>
      }
      <Chessboard 
        onDrop={handleDrop}
        position={board.fen()}
        orientation={gameState.is_white ? 'white' : 'black'}
        onMouseOverSquare={handleOnMouseOverSquare}
        onMouseOutSquare={() => setSquareStyles({})}
        squareStyles={squareStyles}
      />
    </div>
    </>
  );
}

export default Game;
