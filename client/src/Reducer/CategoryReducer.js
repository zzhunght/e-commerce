export const CategoryReducer = (state, action) =>{
    const {type , payload} = action;

    switch (type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                ...payload
            }
    
        default:
            return state
    }
}