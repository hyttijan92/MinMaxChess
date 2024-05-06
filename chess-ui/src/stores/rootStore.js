import {createSlice, configureStore} from "@reduxjs/toolkit";
import { getUserState } from "../utils/utilFunctions";
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
            state.gameState = action.payload
        },
        toggle_promotion_dialog: (state, action) =>{
            state.gameState.showPromotionDialog = action.payload.showPromotionDialog
        }
    }
})

export const {start_game, update_game,toggle_promotion_dialog} = gameSlice.actions;

export const store = configureStore({
    reducer: gameSlice.reducer
});

export const selectGameState = state => state.gameState
export const selectUserUUID = state => state.userState.user_uuid
