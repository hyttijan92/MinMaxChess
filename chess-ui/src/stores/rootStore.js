import {createSlice, configureStore} from "@reduxjs/toolkit";
import { getUserState } from "../utils/utilFunctions";
import * as api from "../api/api.js";
const gameSlice = createSlice({
    name: 'game',
    initialState: {
        userState:getUserState(),
        gameState: null,
        gameUIState:{
            showPromotionDialog: false,
            showEndingDialog: false            
        },
        scoreState: []
    },
    reducers :{
        start_game: (state, action) =>{
            state.gameState = action.payload
        },
        reset_game: (state) =>{
            state.gameState = null;
        },
        update_game:(state, action) =>{
            state.gameState = {...state.gameState,...action.payload}
        },
        update_scores:(state, action) =>{
            state.scoreState = action.payload
        },
        toggle_promotion_dialog: (state, action) =>{
            console.log(action.payload)
            state.gameUIState.showPromotionDialog = action.payload.showPromotionDialog
        },
        store_pending_move: (state, action) =>{
            state.gameState.pendingMove = action.payload
        }
    }
})

export const {start_game, update_game, store_pending_move,toggle_promotion_dialog,update_scores,reset_game} = gameSlice.actions;

export const store = configureStore({
    reducer: gameSlice.reducer
});


export const initializeGameState = (user_uuid) =>{
    return async dispatch => {
        const game = await api.getCurrentGameApi(user_uuid)
        dispatch(start_game(game))
    }
}
export const updateScoreState = (page) =>{
    return async dispatch =>{
        const scores = await api.getPreviousGamesApi(page)
        console.log(scores)
        dispatch(update_scores(scores))
    }
}
export const makeAIMove = (user_uuid,id,fen) =>{

    return async dispatch =>{
        const game = await api.makeGameMoveApi(user_uuid, id, fen)
        dispatch(update_game(game))
    }
}
export const resign = (game_id) =>{
    return async dispatch =>{
        const game = await api.resignApi(game_id)
        dispatch(update_game(game))
    }
}
export const selectGameState = state => state.gameState
export const selectGameUIState = state => state.gameUIState
export const selectUserUUID = state => state.userState.user_uuid
export const selectScoreState = state => state.scoreState;
