export const addCartItem = (item) => ({
    type: 'ADD_ITEM',
    payload: item
})

export const deleteCartItem = (item) => ({
    type: 'DELETE_ITEM',
    payload: item
})

export const addHostingItem = (item) => ({
    type: 'ADD_HOSTING_PACK',
    payload: item
})

export const updateHostingItem = (item) => ({
    type: 'UPDATE_HOSTING_PACK',
    payload: item
})

export const deleteAllItem = () => ({
    type: 'DELETE_ALL_ITEM',
})



