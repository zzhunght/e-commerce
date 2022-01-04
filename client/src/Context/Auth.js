import { createContext , useReducer , useEffect,useContext } from 'react'
import {ApiUrl,TOKEN} from './constant'
import axios from 'axios'
import { AuthReducer } from '../Reducer/AuthReducer'
import setAuthToken from '../untils/setAuthToken'

export const AuthContext = createContext()


const AuthContextProvider = ({children}) =>{
    const [authState,dispatch] = useReducer(AuthReducer,{
        authLoading:true,
        isAuthenticated:false,
        user:null
    })

    const LoadUser = async() =>{
        if(localStorage.getItem(TOKEN)){
            setAuthToken(localStorage.getItem(TOKEN))
        }
        try {
            const res = await axios.get(`${ApiUrl}/auth`)
            if(res.data.success){
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated:true,
                        authLoading:false,
                        user: res.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(TOKEN)
            dispatch({
                type: 'LOAD_AUTH_FAIL',
                payload: {
                    isAuthenticated:false,
                    user: null,
                    authLoading:false
                }
            })
        }
        
        
    }
    const Login = async (form) =>{
        
        try {
            const response = await axios.post(`${ApiUrl}/auth/login`,form)
            if(response.data.success){
                localStorage.setItem(TOKEN,response.data.accessToken)
                await LoadUser()
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
    const LogOut = ()=>{
        console.log("logout")
        localStorage.removeItem(TOKEN)
        dispatch({
            type:'LOG_OUT',
            payload:{}
        })
       
    }
    const Register = async (form) =>{
        try {
            const response = await axios.post(`${ApiUrl}/auth/register`,form)
            if(response.data.success){
                localStorage.setItem('AccessToken',response.data.accessToken)
                await LoadUser()
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
    useEffect(()=>{
        LoadUser()
    },[])
    const authContextData = {Login,Register,LogOut,authState}
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider