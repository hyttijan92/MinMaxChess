import '../App.css';
import Header from '../components/Header';
import {useState} from 'react';
import Chessboard from 'chessboardjsx';
import  {Chess} from "chess.js";
import Modal from '../components/Modal';
function Game() {
  const [game,setGame] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"))
  const [squareStyles,setSquareStyles] = useState({});
  const [promotionDialogShown, setPromotionDialogShown] = useState(false)
  const handleDrop = ({sourceSquare, targetSquare,piece}) =>{
    console.log({from: sourceSquare, to:targetSquare, piece:piece})
    //checkForPromotion(sourceSquare,targetSquare,piece)
    movePiece(sourceSquare,targetSquare,'q')
    
  }
  const choosePromotion = (sourceSquare,targetSquare ) => (piece) =>{

  }
  const movePiece = (sourceSquare, targetSquare, promotion = null) =>{
    try{
      game.move({from: sourceSquare, to:targetSquare,promotion: promotion})
      setGame(new Chess(game.fen()))
      fetchAIMove(game);
    }
    catch(e){
      console.log(e);
    } 
  }
  const checkForPromotion = (sourceSquare, targetSquare, piece) =>{
    if(piece ==='wP'){
      if(['a8','b8','c8','d8','e8','f8','g8','h8'].includes(targetSquare)){
        setPromotionDialogShown(true);
      }
      else{
        movePiece(sourceSquare, targetSquare)
      }
    }
  }
  const handleOnMouseOverSquare = (square) =>{
    let moves = game.moves({
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
  const fetchAIMove = async(game) =>{

    const data = {
      user_uuid: "TEST",
      fen: game.fen()
    }
    const response = await fetch("/api/move",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    console.log(json);
    if(json.is_checkmate){
      alert("GAME OVER. Winner is",json.winner)
      setGame(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"))
    }
    else if(json.is_stalemate){
      alert("GAME OVER. STALEMATE")
      setGame(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"))
    }
    setGame(new Chess(json.fen));
  }
  return (
    <>
      <Header/>
      {promotionDialogShown &&
      <Modal choosePromotion={choosePromotion()}/>
      }
    <div className="container mx-auto">
      <Chessboard 
        onDrop={handleDrop}
        position={game.fen()}
        onMouseOverSquare={handleOnMouseOverSquare}
        onMouseOutSquare={() => setSquareStyles({})}
        squareStyles={squareStyles}
      />
    </div>
    </>
  );
}

export default Game;
