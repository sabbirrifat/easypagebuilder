export const user_login = (details) =>({
    type : 'LOGIN',
    payload : details,
})

export const user_logout = () =>({
    type : 'LOGOUT'
})