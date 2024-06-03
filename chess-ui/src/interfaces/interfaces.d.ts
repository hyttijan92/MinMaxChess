interface IPreviousGame{
    created_at: string,
    draw: boolean,
    fen: string,
    game_engine: string,
    game_status: string,
    id: number,
    is_white: boolean,
    user_uuid: string,
    winner: string | undefined,
}
interface IPendingMove{
    sourceSquare: string,
    targetSquare: string
}
interface IGameState extends IPreviousGame{
    aiStarts: boolean
    pendingMove: IPendingMove|undefined
}
interface IUserState{
    user_uuid: string
}
interface IGameUIState{
    error: null| undefined | IError
    loading: boolean
    showPromotionDialog: boolean
}

interface IState{
    gameState: IGameState|undefined,
    userState: IUserState,
    gameUIState: IGameUIState,
    scoreState: Array<IPreviousGame>
}
interface IError {
    message: string
}
export {
    IPreviousGame,
    IPendingMove,
    IState,
    IGameState,
    IError,
}
