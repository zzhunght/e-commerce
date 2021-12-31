export const AuthReducer = (state, action) =>{
    const { type , payload:{isAuthenticated,authLoading,user} } = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                isAuthenticated,
                authLoading,
                user
            }
        case 'LOAD_AUTH_FAIL':
            return {
                ...state,
                isAuthenticated,
                authLoading,
                user
            }
        case 'LOG_OUT':
            return {
                ...state,
                isAuthenticated:false,
                authLoading:false,
                user:null
            }
        default:

            return state
    }
}