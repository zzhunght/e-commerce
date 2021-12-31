export const AuthReducer = (state, action) =>{
    const { type , payload } = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                auth:payload.productLoading,
                products: payload.products
            }
        case 'LOAD_PRODUCTS_FAIL':
            return {
                ...state,
                productLoading:payload.productLoading,
                products: payload.products
            }
        default:

            return state
    }
}