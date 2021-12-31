import { createContext , useReducer , useEffect } from 'react'
import {ApiUrl} from './constant'
import axios from 'axios'
import { AuthReducer } from '../Reducer/AuthReducer'

export const AuthContext = createContext()


const AuthContextProvider = ({children}) =>{
    const [authState,dispatch] = useReducer(AuthReducer,{
        authLoading:true,
        isAuthenticated:false,
        user:null
    })

    const Login = async (form) =>{
        
        try {
            const response = await axios.post(`${ApiUrl}/auth/login`,form)
            if(response.data.success){
                localStorage.setItem('AccessToken',response.data.accessToken)
                return response.data
            }
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {
                success: false,
                message:"Somethings went wrongs"
            }
        }
    }
    const Register = async (form) =>{
        try {
            const response = await axios.post(`${ApiUrl}/auth/register`,form)
            if(response.data.success){
                localStorage.setItem('AccessToken',response.data.accessToken)
                return response.data
            }
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {
                success: false,
                message:"Somethings went wrongs"
            }
        }
    }

    const authContextData = {Login,Register}
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider