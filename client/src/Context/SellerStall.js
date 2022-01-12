import axios from 'axios'
import { createContext , useReducer} from 'react'
import { SellerReducer } from '../Reducer/SellerReducer'
import { ApiUrl } from './constant'


export const SellerContext = createContext()

const SellerContextProvider = ({children}) =>{

    const [SellerState,dispatch] = useReducer(SellerReducer,{
        products:[],
        shop:null,
        shopLoading:true,
    })

    const GetShop = async (id) =>{

        try {
            const res = await axios.get(`${ApiUrl}/products/${id}/shop`)
            if(res.data.success){
                dispatch({
                    type: 'SET_SHOP',
                    payload: {
                        shop: res.data.user,
                        products:res.data.products,
                        shopLoading:false
                    }
                })
            }
        } catch (error) {
            if(error.response) return error.response
            dispatch({
                type: 'SET_SHOP_FAILED',
                payload: {
                    shopLoading:false,
                    products:[],
                    user:null
                }
            })
        }
    }

    const sellerdata ={GetShop,SellerState}
    return (
        <SellerContext.Provider value={sellerdata}>
            {children}
        </SellerContext.Provider>
    )
}

export default SellerContextProvider