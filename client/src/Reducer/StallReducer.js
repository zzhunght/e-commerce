export const StallReducer = (state, action) =>{
    const {type ,payload} = action

    switch (type) {
        case 'SET_STALL':
            return {
                ...state,
                ...payload
            }
        case 'SET_ITEM':{
            return{
                ...state,
                item : {
                    ...payload.item[0]
                }
            }
        }
        case 'POST_ITEM':
            return {
                ...state,
                stalls:state.stalls.unshift(payload),
            }
        case 'DELETE_ITEM':
            return{
                ...state,
                stalls: state.stalls.filter(i => i._id !== payload)
            }
        default:
            break;
    }
}