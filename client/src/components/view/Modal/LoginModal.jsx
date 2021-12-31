import React, { useState } from 'react'
import {Modal} from 'antd'
import './ModalStyle.css'

function LoginModal({LoginModalShow,handleLoginModal,handleLoginModalCancel}) {
    const [loginForm,setLoginForm] = useState({
        email:'',
        password:''
    })
    const onSubmit = () =>{
        handleLoginModal(loginForm)
    }
    const onChange = (e) =>{
        setLoginForm({
            ...loginForm,
            [e.target.name] : e.target.value
        })
    }
    return (
        <Modal
         title="Login" 
         visible={LoginModalShow} 
         onOk={onSubmit} 
         onCancel={handleLoginModalCancel}
         okText="Login"
        >
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                     type="text" 
                     className="form-control" 
                     name="email"
                     value={loginForm.email}
                     onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                     type="password" 
                     className="form-control"  
                     name="password"
                     value={loginForm.password}
                     onChange={onChange}
                    />
                </div>

            </form>
        </Modal>
    )
}

export default LoginModal
