import React, { useState , useContext, useEffect }from 'react'
import {Modal} from 'antd'
import {CartContext} from '../../Context/Cart'
import {AuthContext} from '../../Context/Auth'
import './CartStyle.css'
function Cart() {
    //Global State
    const {cartState:{carts,total},GetCart,DeleteItem,UpdateQuantity} = useContext(CartContext)
    const {authState:{isAuthenticated}} = useContext(AuthContext)

    // Local State
    const [showModal,setShowModal] = useState(false)
    const [itemId,setItemId] = useState()
    // function
    const handelPreDelete = (id)=>{
        setShowModal(true)
        setItemId(id)
    }

    const handelModalOk = () =>{
        DeleteItem(itemId)
        setShowModal(false)

    }
    const handelModalCancel = () =>{
        setShowModal(false)
    }
    //useEffect
    useEffect(() => GetCart(),[])
    return (
        <div className="carts-wr">
           {
               isAuthenticated ? (
                <div className="cart">
                    <div className="cart-title">
                        <p>Giỏ Hàng</p>
                    </div>
                    <div className="carts-list">
                        {carts?.map((cart, i) =>(
                            <div
                            className="cart-item"
                            key={i}
                            >
                                <div className="cart-item-img">
                                    <img src={cart?.productId?.imageUrl} alt="" />
                                </div>
                                <div className="cart-item-des">
                                    <div className="cart-item-name">
                                        {cart?.productId?.name}
                                    </div>
                                    
                                    <div className="cart-item-size">
                                        <strong>Size :</strong> {cart?.skus.size}
                                    </div>
                                    <div className="cart-item-category">
                                        <strong>Category :</strong> {cart?.productId?.category}
                                    </div>
                                    <div className="cart-item-brand">
                                        <strong style={{color: '#ff6c00'}}>Brand :</strong> {cart?.productId?.brand}
                                    </div>
                                    <div className="cart-item-color">
                                        <strong style={{color: '#0abb0a'}}>Color :</strong> {cart?.color}
                                    </div>
                                    <div className="cart-item-quantity">
                                        <strong>Qty:</strong>
                                        <button
                                         className="btn-descrease" 
                                         disabled={cart?.quantity === 1}
                                         onClick={()=>UpdateQuantity(cart._id,cart?.quantity-1)}
                                        >
                                            -
                                        </button>
                                        {cart?.quantity}
                                        <button
                                         className="btn-increase"
                                         onClick={()=>UpdateQuantity(cart._id,cart?.quantity+1)}

                                        >
                                            +
                                        </button>
                                    </div>
                                    <button className="cart-item-delete" onClick={()=>handelPreDelete(cart?._id)}>
                                        Xoá
                                    </button>
                                </div>
                                <div className="cart-item-price">
                                    ${cart?.skus.price}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="sub-total">
                        <span className="sub-total-title">
                            Subtotal ({carts.length} items) : 
                        </span> 
                        <span className="sub-total-price">
                            ${total}
                        </span>
                    </div>
                </div>
               ) : (
                   <div className="cart-item-not-authorization">
                       <p>Bạn chưa Đăng nhập vui lòng Đăng Nhập để xem giỏ hàng của bạn</p>
                   </div>
               )
           }
           <Modal
             className="modal-delete"
             onOk={handelModalOk}
             onCancel={handelModalCancel}
             visible={showModal}
             okText="Xoá"
             cancelText="Huỷ"
             okType="danger"
            >
                <div className="modal-delete-item">
                    <p>Bạn có muốn xoá sản phẩm khỏi giỏ hàng !</p>
                </div>
           </Modal>
        </div>
    )
}

export default Cart
