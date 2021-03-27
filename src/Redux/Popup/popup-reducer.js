const INITIAL_STATE = {
    popupStatus: false
}

const popupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'UPDATE_POPUPSTATUS':
            return {
                ...state,
                popupStatus: !state.popupStatus
            }

        default:
            return state
    }
}

export default popupReducer;