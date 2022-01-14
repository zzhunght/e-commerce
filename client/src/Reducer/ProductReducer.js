export const ProductReducer = (state, action) =>{
    const { type , payload } = action

    switch (type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                ...payload
            }
        case 'LOAD_PRODUCTS_FAIL':
            return {
                ...state,
                ...payload
            }
        case 'GET_PRODUCT_LOADING':
            return {
                ...state,
                ...payload
            }
        default:

            return state
    }
}