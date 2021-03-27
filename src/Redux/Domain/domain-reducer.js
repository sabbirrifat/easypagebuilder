const INITIAL_STATE = {
    Custom_Domain: '',
    User_Domain: 'test'
}

const domainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'UPDATE_CUSTOM_DOMAIN':
            return {
                ...state,
                Custom_Domain: action.payload
            }
        case 'UPDATE_USER_DOMAIN':
            return {
                ...state,
                User_Domain: action.payload
            }

        default:
            return state
    }
}

export default domainReducer;