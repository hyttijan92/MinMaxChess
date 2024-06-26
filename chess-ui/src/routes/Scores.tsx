import { Fragment, useState } from 'react';
import Header from "../components/Header";
import Loading from "../components/Loading";
import { useEffect } from 'react';
import { selectGameUIState, selectScoreState, updateScoreState } from "../stores/rootStore";
import { IPreviousGame } from '../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
function Scores() {
    const [page, setPage] = useState(0)
    const dispatch = useAppDispatch()
    const previousGames = useAppSelector(selectScoreState);
    const gameUIState = useAppSelector(selectGameUIState)
    useEffect(() => {
        dispatch(updateScoreState(page));
    }, [dispatch, page])
   
    return (
        <>
            <Header />
            <div className="container mx-auto grid justify-center">

                <h1 className={'text-2xl'}>Scores</h1>
                <div className="rounded shadow-md bg-gray-200 border-gray-300 border-solid border-2 break-all grid grid-cols-5">
                    <div className="px-4">ID</div>
                    <div className="px-4">USER UUID</div>
                    <div className="px-4">ENGINE</div>
                    <div className="px-4">STATUS</div>
                    <div className="px-4">Winner</div>
               
                {previousGames.map((previousGame: IPreviousGame) => {
                    return (
                        <Fragment key={previousGame.id}>
                            <div className="px-4">{previousGame.id}</div>
                            <div className="px-4">{previousGame.user_uuid}</div>
                            <div className="px-4">{previousGame.game_engine}</div>
                            <div className="px-4">{previousGame.winner === null ? "DRAW" : "CHECKMATE/RESIGNED"}</div>
                            <div className="px-4">{previousGame.winner}</div>
                        </Fragment>
                    )
                })}
                 </div>
                {page > 0 &&
                    <button  className={'bg-gray-300 text-xl  border-gray-350 border-solid border-2 rounded'} disabled={gameUIState.loading} onClick={() => setPage(page - 1)}>Previous page</button>
                }
                {previousGames.length === 10 &&
                    <button  className={'bg-gray-300 text-xl border-gray-350 border-solid border-2 rounded'} disabled={gameUIState.loading} onClick={() => setPage(page + 1)}>Next page</button>
                }
            </div>
            <Loading/>
        </>
    )
}
export default Scores;