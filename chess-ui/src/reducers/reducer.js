function reducer(state, action) {
    switch (action.type) {
        case 'start_game': {
            return {
                ...state,
                game: action.game
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
export default reducer;