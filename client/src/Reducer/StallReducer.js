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
        default:
            break;
    }
}