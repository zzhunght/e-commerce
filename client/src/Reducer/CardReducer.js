export const CartReducer = (state, action) =>{
    const { type , payload} = action

    switch (type) {
        case 'GET_CART_SUCCESS':
            return {
                ...state,
                ...payload
                
            }
        case 'UPDATE_CART':
            return {
                ...state,
                
            }
        case 'GET_CART_FAIL':
            return {
                ...state,
                carts:state.carts.filter(c=> c._id !== payload.id)
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                carts:state.carts.filter(c => c._id !== payload.id),
                
            }
        default:

            return state
    }
}