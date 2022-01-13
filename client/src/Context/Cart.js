import { createContext , useReducer} from 'react'
import {ApiUrl,TOKEN} from './constant'
import axios from 'axios'
import { CartReducer } from '../Reducer/CardReducer'
import setAuthToken from '../untils/setAuthToken'



export const CartContext = createContext()

const CartContextProvider = ({children}) =>{
    const [cartState,dispatch] = useReducer(CartReducer,{
        carts:[],
        cartLoading: true,
        item:null,
        total:0
    })

    const GetCart = async () =>{
        if(!localStorage.getItem(TOKEN)){
            setAuthToken(localStorage.getItem(null))
        }
        try {
            const res = await axios.get(`${ApiUrl}/cart`)
            if(res.data.success){
                let total = 0;
                for(let i=0; i<res.data.cart.products.length; i++){
                    let currentprice = res.data.cart.products[i].skus.price * res.data.cart.products[i].quantity
                    total += currentprice
                }
                dispatch({
                    type:'GET_CART_SUCCESS',
                    payload:{
                        carts:res.data.cart.products,
                        cartLoading:false,
                        total:total
                    }
                })
            }
        } catch (error) {
            dispatch({
                type:'GET_CART_FAIL',
                payload:{
                    carts:[],
                    cartLoading:false
                }
            })
        }
    }   
    const AddtoCart = async (form) => {

        try {
            const res = await axios.put(`${ApiUrl}/cart/add`,form);
            return res.data
        } catch (error) {
            if(error.response.data) return error.response.data
            return {
                success:false,
                message:'add to card fail'
            }
        }

    }
    const DeleteItem = async (id) => {
        console.log(id)
        try {
            const res = await axios.delete(`${ApiUrl}/cart/delete/${id}`);
            if(res.data.success){
                dispatch({
                    type:'DELETE_ITEM',
                    payload:{id}
                })
                GetCart()
            }
        } catch (error) {
            if(error.response.data) return error.response.data
            return {
                success:false,
                message:'add to card fail'
            }
        }
    }

    const CartContextdata = {GetCart,cartState,AddtoCart,DeleteItem}
    return(
        <CartContext.Provider value={CartContextdata}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider