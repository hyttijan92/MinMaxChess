import React from "react";

export default function Modal({choosePromotion}) {
 
  return  (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <h3 className="text-3xl font-semibold">
                    Choose the promoted piece
                  </h3>
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    onClick={() => choosePromotion('q')}
                  >
                    Queen
                  </button>
                  <button
                    onClick={() => choosePromotion('n')}
                  >
                    Knight
                  </button>
                  <button
                    onClick={() => choosePromotion('r')}
                  >
                    Rook
                  </button>
                  <button
                    onClick={() => choosePromotion('b')}
                  >
                    Bishop
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )
   

}