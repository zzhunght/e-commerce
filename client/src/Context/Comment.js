import { createContext , useReducer } from 'react'
import axios from 'axios'
import CommentReducer from '../Reducer/CommentReducer'
import { ApiUrl } from './constant'
export const CommentContext = createContext()



const CommentContextProvider = ({children}) => {
    const [commentState,dispatch] = useReducer(CommentReducer,{
        comments:[],
        commentLoading:true
    })

    const GetComment = async (id) => {

        try {
            const res = await axios.get(`${ApiUrl}/comment/${id}`)
            if(res.data.success){
                dispatch({
                    type: 'SET_COMMENT',
                    payload:{
                        commentLoading:false,
                        comments:res.data.comments
                    }
                })
            }
        } catch (error) {
            if (error.response) return error.response
            return {
                success: false,

            }
        }

    }
    const PostComment = async (id,form) => {
        try {
            const res = await axios.post(`${ApiUrl}/comment/${id}`, form)
            if(res.data.success){
                console.log(res.data)
                return res.data
            }
            return {
                success: false,
            }
        } catch (error) {
            if (error.response) return error.response
            return {
                success: false,

            }
        }
    }

    const commentValue = {commentState,GetComment,PostComment}
    return (
        <CommentContext.Provider value={commentValue}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentContextProvider