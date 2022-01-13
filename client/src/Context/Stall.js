import { createContext , useReducer , useEffect } from 'react'
import { StallReducer } from '../Reducer/StallReducer'
import axios from 'axios'
import { ApiUrl } from './constant'

export const StallContext = createContext()

const StallContextProvider = ({children}) =>{
    const [StallState,dispatch] = useReducer(StallReducer,{
        stalls:[],
        stallLoading:true,
        item:null,
    })

    const FindItem = (id) =>{
        const item = StallState.stalls.filter(item => item._id === id)
        dispatch({
            type: 'SET_ITEM',
            payload: {
                item: item
            }
        })
    }

    const GetCategory = async() =>{

        try {
            const res = await axios.get(`${ApiUrl}/category`)
            if(res.data.success) return res.data
        } catch (error) {
            if (error.response) return error.response
            return {
                success:false,
                category:[]
            }
        }
    }
    const GetStall = async () =>{
        try {
            const res = await axios.get(`${ApiUrl}/products/myproducts`)
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
            if(res.data.success){
                dispatch({
                    type:'POST_ITEM',
                    payload:{
                        ...form,
                        _id:res.data._id
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

    const EditStall = async (form,id) =>{
        try {
            const res = await axios.patch(`${ApiUrl}/products/${id}`,form)
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

    const DeleteItem = async (id) =>{
        console.log('id',id)
        try {
            const  res = await axios.delete(`${ApiUrl}/products/${id}`)
            if(res.data.success){
                dispatch({
                    type: 'DELETE_ITEM',
                    payload:id
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

    const stalldata = {GetStall,StallState,AddStall,FindItem,EditStall,GetCategory,DeleteItem}
    return (
        <StallContext.Provider value={stalldata}>
            {children}
        </StallContext.Provider>
    )
}

export default StallContextProvider