import React , {useContext , useState, useEffect } from 'react'
import { ProductContext } from '../../../Context/Product'
import { FileProtectOutlined, LikeOutlined, RollbackOutlined, ShopOutlined ,SendOutlined} from '@ant-design/icons'
import { Rate } from 'antd'
import { CartContext } from '../../../Context/Cart'
import { Link, useParams } from 'react-router-dom'
import './ProductDetails.css'
import { CommentContext } from '../../../Context/Comment'
import { AuthContext } from '../../../Context/Auth'
function ProductDetails() {
    ////###########
    const param = useParams()
    const id = param.id


    //global state
    const { GetOneProduct, productState:{product}} = useContext(ProductContext)
    const { AddtoCart ,GetCart } = useContext(CartContext)
    const {authState:{user}} = useContext(AuthContext)
    const {GetComment,commentState:{comments},PostComment} = useContext(CommentContext)
    //local state
    const [sku,setSku] = useState({
        price:0,
        size:''
    })
    const [color,setColor] = useState('')
    const [quantity,setQuantity] = useState(1)
    const [comment,setComment] = useState('')
    const [ratingValue,setRatingValue] = useState(2.5)
    

    const onColorChange = (color) => {
        setColor(color)
    }

    const onSizeChange = (sku) => {
        setSku(sku)
    }

    const onRatingChange = (rating) => {
        setRatingValue(rating)
        console.log(rating)
    }
    const onAddClick = async () => {
        const form = {
            skus:{
                ...sku
            },
            productId:id,
            quantity:quantity,
            color:color
        }
        const res = await AddtoCart(form)
        console.log(res)
        if(res.success) {
            await GetCart()
        }
    }

    const onCommentChange = (e) => {
        setComment(e.target.value)
    }

    const handelSendCmt = async() => {
        const form = {
            comment:comment,
            user:user._id,
            productId:id,
            rating:ratingValue
        }
        const res = await PostComment(id,form)
        if(res.success) {
            await GetComment(id)
            setComment('')
        }
    }
    //get product
    useEffect(() =>{
        GetOneProduct(id) 
    },[id])

    //get product comment
    useEffect(() =>{
        GetComment(id) 
    },[id])

    //set sku
    useEffect(() =>{
        if(product){
            setSku(product.skus[0])
            setColor(product.color[0])
        }
    },[product])

    return (
        <div className="product-details-wr">
            <div className="product-details">
                <div className="mobile-product-details-name">
                        {product?.name}
                    </div>
                <div className="product-details-img">
                    <img src={product?.imageUrl} alt="" />
                </div>
                <div className="product-details-description">
                    <div className="product-details-name">
                        {product?.name}
                    </div>
                    <div className="product-details-price">
                        {sku.price || 100 }  đ
                    </div>
                    <div className="product-details-color">
                        <p className="producttitle">Màu Sắc :</p>
                        {product?.color.map(c =>
                            (
                                <div
                                 className={`color-item ${c === color ?'color-active':''}`}
                                 key={c}
                                 onClick={()=> onColorChange(c)}
                                >
                                    {c}
                                </div>
                            )
                        )}
                    </div>
                    <div className="product-details-size">
                        <p className="producttitle">Size :</p>

                        {product?.skus.map((s,i) =>(
                            <div
                             className={`size ${s.size === sku.size ? 'size-active': ''}`}
                             onClick={()=> onSizeChange(s)}
                             key={i}
                            >
                                {s.size}
                            </div>
                        ))}
                    </div>
                    <div className="quantity-add-to-card">
                        <div className="quantity-control">
                            <button
                             className={`descreasement ${quantity===1 ? 'disabled':''}` }
                             disabled={quantity===1}
                             onClick={()=>setQuantity(prev => prev - 1)}
                            >
                                -
                            </button>
                            <p>{quantity}</p>
                            <button 
                             className="increasement"
                             onClick={()=>setQuantity(prev => prev + 1)}

                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="add-to-card-btn">
                        <button
                         className="btn" 
                         onClick={()=>onAddClick()}
                        >
                            Add TO CarT
                        </button>
                    </div>
                </div>
                <div className="product-details-shop">
                    
                    <div className="product-details-shop-header">
                        <div className="shop-img">
                            <img src="https://cdn1.vectorstock.com/i/1000x1000/65/60/business-online-shop-computer-monitor-store-icon-vector-17026560.jpg" alt=""/>
                        </div>
                        <div className="shop-name">{product?.user?.firstName} {product?.user?.lastName}</div>
                    </div>

                    <div className="watch-shop">
                        <Link to={`/${product?.user?._id}/stall`} className="watch-shop-details">
                            <ShopOutlined style={{marginRight:'4px'}} /> Xem Shop
                        </Link>
                        <div className="follow-shop shop-des-btn">
                            + Theo Dõi
                        </div>
                    </div>
                    <div className="shop-security">
                        <div className="shop-security-item">
                            <span className="shop-security-title">Thời Gian Bảo Hành</span>
                            <span className="shop-security-value"> 2 Năm</span>
                        </div>
                        <div className="shop-security-item">
                            <span className="shop-security-title">Hình thức Bảo Hành</span>
                            <span className="shop-security-value">Phiếu bảo hành</span>
                        </div>
                        <div className="shop-security-item">
                            <span className="shop-security-title">Nơi Bảo Hành</span>
                            <span className="shop-security-value">Tại cửa hàng</span>
                        </div>
                        <div className="shop-security-item">
                            <span className="shop-security-title">Hướng dẫn Bảo Hành</span>
                            <span className="shop-security-value shop-security-link"> Xem Chi tiết</span>
                        </div>
                    </div>
                    <div className="benefit">
                        <div className="benefit-item">
                            <div className="benefit-item-icon">
                                <FileProtectOutlined className="benefit-icon" />
                            </div>
                            <div className="benefit-item-value">
                                <span>Hoàn Tiền</span>
                                <span  className="benefit-item-value-title">111% </span>
                                <span>nếu hàng giả</span>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-item-icon">
                                <LikeOutlined className="benefit-icon" />
                            </div>
                            <div className="benefit-item-value">
                                <span>Mở hộp</span>
                                <span>Kiểm tra</span>
                                <span>Nhận hàng</span>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-item-icon">
                                <RollbackOutlined className="benefit-icon" />
                            </div>
                            <div className="benefit-item-value">
                                <span>Đổi trả hàng</span>
                                <span  className="benefit-item-value-title">7 Ngày</span>
                                <span>nếu sp lỗi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cmt-wr">
                <h2 className="cmt-header">
                    Bình luận về sản phẩm
                </h2>
                <div className="list-cmt">
                    {comments?.map(comment =>(
                        <div className="cmt-item">
                        <div className="customer-avatar">
                            <img src={comment.user.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKbihJUYGVfMawl2VX4x8pX9BaPodV_RAThV--JiHl5AsQybzScy6G0xeoaCfgcw-h_XQ&usqp=CAU'} alt="" />
                        </div>
                        <div className="customer-cmt-des">
                            <div className="customer-name">
                                {comment.user.firstName} {comment.user.lastName}
                            </div>
                            <div className="customer-rating">
                                <Rate
                                 allowHalf
                                 value={comment.rating}
                                 disabled
                                 className="customer-rating-star"
                                />
                            </div>
                            <div className="customer-review">
                                {comment.comment}
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
                {comments.length === 0 && 
                    <div className="cmt-empty">
                        <div className="cmt-empty-icon">
                            <img src="https://cdn-icons-png.flaticon.com/512/3159/3159020.png" alt="" />
                        </div>
                        <h2 className="no-cmt-title">Sản Phẩm này chưa có bình luận</h2>
                    </div>
                }
                <div className="rating-box">
                    <Rate
                     allowHalf
                     defaultValue={2.5}
                     className="rating-choice"
                     onChange={onRatingChange}
                     />
                </div>
                <div className="cmt-box">
                    
                    <input
                     type="text-area" 
                     className="cmt-box-area" 
                     value={comment}
                     onChange={(e)=>onCommentChange(e)}
                    />

                    <button className='btn cmt-btn' >
                        <SendOutlined
                         className={`cmt-send-icon ${comment.length === 0 ?'disabled':''}`} 
                         onClick={handelSendCmt}
                        />
                    </button>
                </div>
            </div>
        </div>

        
    )
}

export default ProductDetails
