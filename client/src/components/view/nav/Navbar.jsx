import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Context/Auth'
import logo from '../../../asset/logo.png'
import ava from '../../../asset/ava.jpg'
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import './NavbarStyle.css'
import LoginModal from '../Modal/LoginModal'
import RegisterModal from '../Modal/RegisterModal'
import {message ,Badge} from 'antd'
import { CartContext } from '../../../Context/Cart'
import { CategoryContext } from '../../../Context/Category'
import { ProductContext } from '../../../Context/Product'



function Navbar() {

    //global state
    const {LogOut,Login,Register,authState:{isAuthenticated,authLoading,user}} = useContext(AuthContext)
    const {cartState:{
        carts
    },GetCart} = useContext(CartContext)
    const {CategoryState:{
        categories,
        categoryLoading
    },GetCategory} = useContext(CategoryContext)
    const {GetProductBySearch} = useContext(ProductContext)
    //local state
    const [LoginModalShow,setLoginModalShow] = useState(false)
    const [RegisterModalShow,setRegisterModalShow] = useState(false)
    const [searchKey,setSearchKey] = useState('')

    //useffect

    useEffect(() =>{
        GetCart()
        GetCategory()
    },[user])
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

    const onClickLogOut = () =>{
        LogOut()
        
    }
    //
    const onSearchInputChange = (e) =>{
        setSearchKey(e.target.value)
    }
    return (
        <div className="navbar-wr">
            <div className="navbar">    
                <Link to="/" className="logo">
                    <img src={logo} alt="" />
                </Link>
                <div className="search-box">
                    <input
                     name="search" 
                     placeholder="Search" 
                     type="text" 
                     className="search-form"
                     value={searchKey}
                     onChange={onSearchInputChange}
                    />
                    <Link to={`/search/${searchKey}`} className="search-icon" onClick={()=>GetProductBySearch(searchKey)}>
                        <SearchOutlined />
                    </Link>
                </div>
                <div className="auth-control">
                    {
                        !isAuthenticated && !user &&
                        <div className="login-register">
                            <p className="login" onClick={()=>setLoginModalShow(true)}>Đăng Nhập</p>
                            <p className="register" onClick={()=>setRegisterModalShow(true)}>Đăng Ký</p>
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
                                        <li className="user-feature-item">
                                            <Link to="/my-stall/products">
                                                Cửa hàng của tôi
                                            </Link>
                                        </li>
                                        <li className="user-feature-item">
                                            Cài Đặt 
                                        </li>
                                        <li className="user-feature-item" onClick={onClickLogOut}> Đăng xuất</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="welcome">
                                <p>Hi, {user.firstName} {user.lastName}</p>
                            </div>
                        </div>
                    }
                </div>
                <div className="cart-icon-wr">
                    <Link to="/my-cart" className="cart-icon">
                        <Badge count={carts.length || 0}  className="badge">
                            <ShoppingCartOutlined  className="shopping-cart-icon"/>
                        </Badge>

                    </Link>
                </div>
            </div>
            <div className="search-box mobile">
                    <input
                     name="search" 
                     placeholder="Search" 
                     type="text" 
                     className="search-form"
                     value={searchKey}
                     onChange={onSearchInputChange}
                    />
                    <Link to={`/search/${searchKey}`} className="search-icon" onClick={()=>GetProductBySearch(searchKey)}>
                        <SearchOutlined />
                    </Link>
                </div>
            <div className="categories-list">
                {
                    categories && categories.length >0 &&
                    categories.map((item,i) => (
                        <div className="category-item" key={i}>
                            <Link to={`/category/${item._id}/products`}>
                                {item.label.vi}
                            </Link>
                        </div>
                    ))
                }
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
        
        </div>
    )
}

export default Navbar
