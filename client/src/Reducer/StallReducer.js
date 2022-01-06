export const StallReducer = (state, action) =>{
    const {type ,payload} = action

    switch (type) {
        case 'SET_STALL':
            return {
                ...state,
                ...payload
            }
    
        default:
            break;
    }
}