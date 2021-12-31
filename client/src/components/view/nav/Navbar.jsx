import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../Context/Auth'
import logo from '../../../asset/logo.png'
import ava from '../../../asset/ava.jpg'
import { SearchOutlined } from '@ant-design/icons'
import './NavbarStyle.css'
import LoginModal from '../Modal/LoginModal'
import RegisterModal from '../Modal/RegisterModal'
import {message} from 'antd'



function Navbar() {
    const {LogOut,Login,Register,authState:{isAuthenticated,authLoading,user}} = useContext(AuthContext)
    const [LoginModalShow,setLoginModalShow] = useState(false)
    const [RegisterModalShow,setRegisterModalShow] = useState(false)
    
    //handel login
    const handleLoginModal = async(form)=>{
        console.log(form)
        const res = await Login(form)
        console.log(res)
        if(res.success) {
            message.success(res.message)
            setLoginModalShow(false)
        }
        else{
            message.error(res.message)
        }

    }
    const handleLoginModalCancel = () =>{
        setLoginModalShow(false)
    }

    //handel-register
    const handleRegisterModal = async (form)=>{
        const res = await Register(form)
        console.log(res)
        if(res.success) {
            message.success(res.message)
            setRegisterModalShow(false)
        }
        else{
            message.error(res.message)

        }

    }
    const handleRegisterModalCancel = () =>{
        setRegisterModalShow(false)
    }
    return (
        <>
        <div className="navbar">    
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="search-box">
                <input name="search" placeholder="Search" type="text" className="search-form"/>
                <div className="search-icon">
                    <SearchOutlined />
                </div>
            </div>
            <div className="auth-control">
                {
                    !isAuthenticated && !user &&
                    <div className="login-register">
                        <p className="login" onClick={()=>setLoginModalShow(true)}>Login</p>
                        <p className="register" onClick={()=>setRegisterModalShow(true)}>register</p>
                    </div>
                }
                {
                    isAuthenticated && user &&
                    <div className="user-wr">
                        <div className="user">
                            <div className="user-avatar">
                                <img src={ava} alt="" />
                            </div>
                            <div className="user-feature">
                                <ul className="user-feature-list">
                                    <li className="user-feature-item"> Cửa hàng của tôi</li>
                                    <li className="user-feature-item" onClick={()=>LogOut()}> Đăng xuất</li>
                                </ul>
                            </div>
                        </div>
                        <div className="welcome">
                            <p>Hi, {user.firstName} {user.lastName}</p>
                        </div>
                    </div>
                }
            </div>
            <div className="cart-wr">
                
            </div>
        </div>
        <LoginModal
         LoginModalShow={LoginModalShow} 
         handleLoginModalCancel={handleLoginModalCancel} 
         handleLoginModal={handleLoginModal} 
        />
        <RegisterModal
         RegisterModalShow={RegisterModalShow} 
         handleRegisterModalCancel={handleRegisterModalCancel} 
         handleRegisterModal={handleRegisterModal} 
        />
        
        </>
    )
}

export default Navbar
