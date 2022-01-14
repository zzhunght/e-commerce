import axios from 'axios'
import { createContext , useReducer} from 'react'
import { CategoryReducer } from '../Reducer/CategoryReducer'
import { ApiUrl } from './constant'


export const CategoryContext = createContext()


const CategoryContextProvider = ({children}) =>{
    const [CategoryState, dispatch] = useReducer(CategoryReducer,{
        categories:[],
        categoryLoading:true,
        category:null
    })


    const GetCategory = async() =>{
        try {
            const res = await axios.get(`${ApiUrl}/category`)
            if(res.data.success){
                dispatch({
                    type:'SET_CATEGORIES',
                    payload:{
                        categoryLoading:false,
                        categories:res.data.category
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
    

    const categoryvalue = {GetCategory,CategoryState}
    return (
        <CategoryContext.Provider value={categoryvalue}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider