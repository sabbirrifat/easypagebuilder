import {defaultheaders} from '../../utils/axios.common.header'
const init_state = {
    user : null,
}

export const userReducer = (state=init_state,actions={})=>{
    switch(actions.type){
        case 'LOGIN' : {
            return {
                ...state,
                user : actions.payload
            }
        }
        case 'LOGOUT' : {
            defaultheaders();
            return {
                ...state,
                user : null
            }
        }

        default : 
            return state;
    }
}