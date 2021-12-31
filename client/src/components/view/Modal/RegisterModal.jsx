import React, { useState } from 'react'
import {Modal,message} from 'antd'
import './ModalStyle.css'

function RegisterModal({RegisterModalShow,handleRegisterModal,handleRegisterModalCancel}) {
    const [RegisterForm,setRegisterForm] = useState({
        firstName: '',
        lastName: '',
        email:'',
        password:''
    })
    const onSubmit = () =>{
        if(!RegisterForm.firstName || !RegisterForm.lastName || !RegisterForm.email || !RegisterForm.password)
            return message.error('Missing some infomation')
        handleRegisterModal(RegisterForm)
    }
    const onChange = (e) =>{
        setRegisterForm({
            ...RegisterForm,
            [e.target.name] : e.target.value
        })
    }
    return (
        <Modal
         title="Register" 
         visible={RegisterModalShow} 
         onOk={onSubmit} 
         onCancel={handleRegisterModalCancel}
         okText="Register"
        >
            <form onSubmit={onSubmit}>
                 <div className="form-group">
                    <input
                     type="text" 
                     className="form-control" 
                     name="firstName"
                     placeholder="First Name"
                     value={RegisterForm.firstName}
                     onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                     type="text" 
                     className="form-control" 
                     placeholder="Last Name"
                     name="lastName"
                     value={RegisterForm.lastName}
                     onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                     type="text" 
                     className="form-control" 
                     name="email"
                     placeholder="Email"
                     value={RegisterForm.email}
                     onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                     type="password" 
                     className="form-control"  
                     name="password"
                     placeholder="Password"
                     value={RegisterForm.password}
                     onChange={onChange}
                    />
                </div>

            </form>
        </Modal>
    )
}

export default RegisterModal
