const INITIAL_STATE = {
    data: [],
    translation: '',
    colors: ''
}

const pagesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_PAGES_DATA':
            return {
                ...state,
                data: action.payload
            }
        case 'CHANGE_TRANSLATION':
            return {
                ...state,
                translation: action.payload
            }
        case 'UPDATE_COLORS':
            return {
                ...state,
                colors: action.payload
            }

        default:
            return state
    }
}

export default pagesReducer