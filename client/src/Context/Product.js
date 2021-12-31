import { createContext , useReducer } from "react";
import { ProductReducer } from '../Reducer/ProductReducer'
import {ApiUrl} from './constant'
import axios from 'axios'
export const ProductContext = createContext()

const ProductContextProvider = ({children}) =>{
    const [productState, dispatch] = useReducer(ProductReducer,{
        productLoading:true,
        products:[]
    })

    const getProduct = async ()=>{
        try {
            const res = await axios.get(`${ApiUrl}/products`)
            if(res.data.success){
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: {
                        productLoading:false,
                        products:res.data.products
                    }
                })
            }
        } catch (error) {
            console.error(error)
            dispatch({
                type: 'LOAD_PRODUCTS_FAIL',
                payload: {
                    productLoading:false,
                    products:[]
                }
            })
        }
    }

    const productContextdata = { getProduct,productState}
    return (
        <ProductContext.Provider value={productContextdata}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider 