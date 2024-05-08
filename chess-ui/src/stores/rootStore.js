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
        }
    },
    reducers :{
        start_game: (state, action) =>{
            state.gameState = action.payload
        },
        update_game:(state, action) =>{
            state.gameState = {...state.gameState,...action.payload}
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

export const {start_game, update_game, store_pending_move,toggle_promotion_dialog} = gameSlice.actions;

export const store = configureStore({
    reducer: gameSlice.reducer
});


export const initializeGameState = () =>{
    return async dispatch => {
        const game = await api.getCurrentGameApi(store.userState.user_uuid)
        dispatch(start_game(game))
    }
}
export const selectGameState = state => state.gameState
export const selectGameUIState = state => state.gameUIState
export const selectUserUUID = state => state.userState.user_uuid
