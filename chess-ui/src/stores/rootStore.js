import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getUserState, errorHandler } from "../utils/utilFunctions";
import * as api from "../api/api.js";
const gameSlice = createSlice({
    name: 'game',
    initialState: {
        userState: getUserState(),
        gameState: null,
        gameUIState: {
            showPromotionDialog: false,
            showEndingDialog: false,
            error: null,
            loading: false
        },
        scoreState: []
    },
    reducers: {
        startGame: (state, action) => {
            state.gameState = action.payload
        },
        resetGame: (state) => {
            state.gameState = null;
        },
        updateGame: (state, action) => {
            state.gameState = { ...state.gameState, ...action.payload }
        },
        updateScores: (state, action) => {
            state.scoreState = action.payload
        },
        togglePromotionDialog: (state, action) => {
            state.gameUIState.showPromotionDialog = action.payload.showPromotionDialog
        },
        storePendingMove: (state, action) => {
            state.gameState.pendingMove = action.payload
        },
        setError: (state, action) => {
            state.gameUIState.error = action.payload
        },
        setLoading: (state, action) => {
            state.gameUIState.loading = action.payload
        }
    }
})

export const { startGame, updateGame, storePendingMove, togglePromotionDialog, updateScores, resetGame, setError, setLoading } = gameSlice.actions;

export const store = configureStore({
    reducer: gameSlice.reducer
});


export const initializeGameState = (user_uuid) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const game = await api.getCurrentGameApi(user_uuid)
            dispatch(startGame(game))
        }
        catch (e) {
            dispatch(setError({ message: errorHandler(e) }))
            setTimeout(() => dispatch(setError(null)), 5000)
        }
        finally {
            dispatch(setLoading(false))
        }

    }
}
export const updateScoreState = (page) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const scores = await api.getPreviousGamesApi(page)
            dispatch(updateScores(scores))
        }
        catch (e) {
            dispatch(setError({ message: errorHandler(e) }))
            setTimeout(() => dispatch(setError(null)), 5000)
        }
        finally {
            dispatch(setLoading(false))
        }
    }
}
export const makeAIMove = (user_uuid, id, fen) => {

    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const game = await api.makeGameMoveApi(user_uuid, id, fen)
            dispatch(updateGame(game))
        }
        catch (e) {
            dispatch(setError({ message: errorHandler(e) }))
            setTimeout(() => dispatch(setError(null)), 5000)

        }
        finally {
            dispatch(setLoading(false))
        }
    }
}
export const resign = (game_id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const game = await api.resignApi(game_id)
            dispatch(updateGame(game))
        }
        catch (e) {
            dispatch(setError({ message: errorHandler(e) }))
            setTimeout(() => dispatch(setError(null)), 5000)
        }
        finally {
            dispatch(setLoading(false))
        }
    }
}

export const draw = (game_id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const game = await api.drawApi(game_id)
            dispatch(updateGame(game))
        }
        catch (e) {
            dispatch(setError({ message: errorHandler(e) }))
            setTimeout(() => dispatch(setError(null)), 5000)
        }
        finally {
            dispatch(setLoading(false))
        }
    }
}
export const selectGameState = state => state.gameState
export const selectGameUIState = state => state.gameUIState
export const selectUserUUID = state => state.userState.user_uuid
export const selectScoreState = state => state.scoreState;
