import React from "react";
import { useDispatch } from "react-redux";
import {useNavigate } from 'react-router-dom'
import { resetGame } from "../stores/rootStore";
export default function GameOverDialog({ draw, winner }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () =>{
    dispatch(resetGame());
    navigate("/")
  }
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">

          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <h3 className="text-3xl font-semibold">
              Game over
            </h3>
            {draw ? 
            <p>
              Game ended in a draw.
            </p>
            :
            <p>
              Game ended. The winner is {winner}
            </p>
            }
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <button
                className={"bg-blue-500 text-white px-8 py-4 rounded-full text-xl"}
                onClick={handleClick}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )


}