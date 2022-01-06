import { createContext , useReducer , useEffect } from 'react'
import { StallReducer } from '../Reducer/StallReducer'
import axios from 'axios'
import { ApiUrl } from './constant'

export const StallContext = createContext()

const StallContextProvider = ({children}) =>{
    const [StallState,dispatch] = useReducer(StallReducer,{
        stalls:[],
        stallLoading:true,
        item:null
    })

    const GetStall = async () =>{
        try {
            const res = await axios.get(`${ApiUrl}/products/myproducts`)
            console.log('my-product',res.data)
            if(res.data.success){
                dispatch({
                    type: 'SET_STALL',
                    payload: {
                        stallLoading:false,
                        stalls:res.data.products
                    }
                })
            }
        } catch (error) {
            if (error.response) return error.response
            return {
                success: false,
                message:'Some Things went wrongs'

            }
        }
    }

    const AddStall = async (form) =>{
        try {
            const res = await axios.post(`${ApiUrl}/products`,form)
            console.log('add stall res',res.data)
            return res.data
        } catch (error) {
            if (error.response) return error.response
            return {
                success: false,
                message:'Some Things went wrongs'

            }
        }
    }

    const stalldata = {GetStall,StallState,AddStall}
    return (
        <StallContext.Provider value={stalldata}>
            {children}
        </StallContext.Provider>
    )
}

export default StallContextProvider