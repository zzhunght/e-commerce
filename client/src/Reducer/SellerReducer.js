
export const SellerReducer = (state, action) =>{
    const { type , payload} = action;
    switch (type) {
        case 'SET_SHOP':
            return {
                ...state,
                ...payload
            }
        case 'SET_SHOP_FAILED':
            return { 
                ...state,
                ...payload
            }
        default:
            return { 
                ...state
            }
    }
}