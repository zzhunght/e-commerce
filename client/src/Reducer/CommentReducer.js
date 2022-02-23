const CommentReducer = (state, action) =>{
    const { type, payload } = action
    switch (type) {
        case 'SET_COMMENT':
            return {
                ...state,
                commentLoading:payload.commentLoading,
                comments: payload.comments
            }
           
        
        default:
            return state
    }
}

export default CommentReducer