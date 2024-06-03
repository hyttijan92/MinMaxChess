import { IError, IPendingMove, IState } from "../interfaces/interfaces";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { getUserState, errorHandler } from "../utils/utilFunctions";
import * as api from "../api/api";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        userState: getUserState(),
        gameState: undefined,
        gameUIState: {
            showPromotionDialog: false,
            showEndingDialog: false,
            error: undefined,
            loading: false
        },
        scoreState: []
    },
    reducers: {
        startGame: (state: IState, action) => {
            state.gameState = action.payload
        },
        resetGame: (state) => {
            state.gameState = undefined;
        },
        updateGame: (state: IState, action) => {
            state.gameState = { ...state.gameState, ...action.payload }
        },
        updateScores: (state: IState, action) => {
            state.scoreState = action.payload
        },
        togglePromotionDialog: (state: IState, action: PayloadAction<boolean>) => {
            state.gameUIState.showPromotionDialog = action.payload;
        },
        storePendingMove: (state: IState, action: PayloadAction<IPendingMove|undefined>) => {
            if (state.gameState !== undefined){
                state.gameState.pendingMove = action.payload
            }
        },
        setError: (state: IState, action: PayloadAction<IError|undefined>) => {
            state.gameUIState.error = action.payload
        },
        setLoading: (state: IState, action: PayloadAction<boolean>) => {
            state.gameUIState.loading = action.payload
        }
    }
})

export const { startGame, updateGame, storePendingMove, togglePromotionDialog, updateScores, resetGame, setError, setLoading } = gameSlice.actions;

export const store = configureStore({
    reducer: gameSlice.reducer
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const initializeGameState = (user_uuid:string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true))
            const game = await api.getCurrentGameApi(user_uuid)
            dispatch(startGame(game))
        }
        catch (e : unknown) {
            dispatch(setError({ message: errorHandler(e as IError) }))
            setTimeout(() => dispatch(setError(undefined)), 5000)
        }
        finally {
            dispatch(setLoading(false))
        }

    }
}
export const updateScoreState = (page:number) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true))
            const scores = await api.getPreviousGamesApi(page)
            dispatch(updateScores(scores))
        }
        catch (e : unknown) {
            dispatch(setError({ message: errorHandler(e as IError ) }))
            setTimeout(() => dispatch(setError(undefined)), 5000)
        }
        finally {
            dispatch(setLoading(false))
        }
    }
}
export const makeAIMove = (user_uuid : string, id: number, fen: string) => {

    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true))
            const game = await api.makeGameMoveApi(user_uuid, id, fen)
            dispatch(updateGame(game))
        }
        catch (e : unknown) {
            dispatch(setError({ message: errorHandler(e as IError) }))
            setTimeout(() => dispatch(setError(undefined)), 5000)

        }
        finally {
            dispatch(setLoading(false))
        }
    }
}
export const resign = (game_id: number) => {
    return async (dispatch : AppDispatch) => {
        try {
            dispatch(setLoading(true))
            const game = await api.resignApi(game_id)
            dispatch(updateGame(game))
        }
        catch (e: unknown) {
            dispatch(setError({ message: errorHandler(e as IError) }))
            setTimeout(() => dispatch(setError(undefined)), 5000)
        }
        finally {
            dispatch(setLoading(false))
        }
    }
}

export const draw = (game_id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true))
            const game = await api.drawApi(game_id)
            dispatch(updateGame(game))
        }
        catch (e : unknown) {
            dispatch(setError({ message: errorHandler(e as IError) }))
            setTimeout(() => dispatch(setError(undefined)), 5000)
        }
        finally {
            dispatch(setLoading(false))
        }
    }
}
export const selectGameState = (state: IState) => state.gameState
export const selectGameUIState = (state: IState) => state.gameUIState
export const selectUserUUID = (state: IState) => state.userState.user_uuid
export const selectScoreState = (state: IState) => state.scoreState;
