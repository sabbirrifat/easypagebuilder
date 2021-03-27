export const removeCartItem = (productItems, removeProduct) => {

    const exist = productItems.filter(item => item.id === removeProduct.id);
    
    if(exist.length){
        return productItems.filter(item => {
            return item.id !== removeProduct.id
        });
    }
    else{
        return productItems
    }
}

export const updateHostinPack = (hostingPack, newItem) => {
    let updatedHostinPack = hostingPack;
    updatedHostinPack[newItem.id] = newItem.value  
    return updatedHostinPack
}

export const duplicateCheck = (cartItems, newItem) => {
    const duplicate = cartItems.filter(item => item.id === newItem.id);
    if(duplicate.length){
        return cartItems
    }
    else{
        return [...cartItems, newItem]
    }
}