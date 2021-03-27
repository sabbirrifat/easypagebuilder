import { duplicateCheck, removeCartItem, updateHostinPack } from "./cart-utils"

const INITIAL_STATE = {
    cart: [],
    hostingPack: {}
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                cart: duplicateCheck(state.cart, action.payload)
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                cart: removeCartItem(state.cart, action.payload)
            }
            case 'ADD_HOSTING_PACK':
            return {
                ...state,
                hostingPack: action.payload
            }
        case 'UPDATE_HOSTING_PACK':
            return {
                ...state,
                hostingPack: updateHostinPack(state.hostingPack, action.payload)
            }
            case 'DELETE_ALL_ITEM':
                return {
                    ...state,
                    cart: []
                }
        case 'CLEAR_ALL_ITEM':
                return {
                    ...state,
                    cart : [],
                    hostingPack : {},
                }

        default:
            return state
    }
}

export default cartReducer;