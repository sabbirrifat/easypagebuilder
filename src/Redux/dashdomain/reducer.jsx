const init = {
    domain : '',
}

const DashboardDomainReducer = (state = init,action={})=>{
    switch(action.type){
        case 'DASHBOARD_DOMAIN_REGISTER':
            return {
                ...state,
                domain : action.payload,
            }
        default :
            return state;
    }
}

export default DashboardDomainReducer;