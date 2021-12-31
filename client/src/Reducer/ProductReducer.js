export const ProductReducer = (state, action) =>{
    const { type , payload } = action

    switch (type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                productLoading:payload.productLoading,
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