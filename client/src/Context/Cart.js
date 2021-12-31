import { createContext , useReducer} from 'react'


export const CartContext = createContext()

const CartContextProvider = ({children}) =>{


    const CartContextdata = {}
    return(
        <CartContext.Provider value={CartContextdata}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider