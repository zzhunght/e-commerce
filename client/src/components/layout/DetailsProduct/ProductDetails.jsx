import React , {useContext , useState, useEffect } from 'react'
import { ProductContext } from '../../../Context/Product'
import { FileProtectOutlined, LikeOutlined, RollbackOutlined, ShopOutlined} from '@ant-design/icons'
import { CartContext } from '../../../Context/Cart'
import { Link, useParams } from 'react-router-dom'
import './ProductDetails.css'
function ProductDetails() {

    //global state
    const { GetOneProduct, productState:{product}} = useContext(ProductContext)
    const { AddtoCart ,GetCart } = useContext(CartContext)

    //local state
    const [sku,setSku] = useState({
        price:0,
        size:''
    })
    const [color,setColor] = useState('')
    const [quantity,setQuantity] = useState(1)

    ////###########
    const param = useParams()
    const id = param.id

    const onColorChange = (color) => {
        console.log('color',color)
        setColor(color)
    }

    const onSizeChange = (sku) => {
        setSku(sku)
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
    useEffect(() =>{
        GetOneProduct(id) 
    },[id])
    useEffect(() =>{
        if(product){
            setSku(product.skus[0])
            setColor(product.color[0])
        }
    },[product])

    return (
        <div className="product-details-wr">
            <div className="product-details">
                <div className="product-details-img">
                    <img src={product?.imageUrl} alt="" />
                </div>
                <div className="product-details-description">
                    <div className="product-details-name">
                        {product?.name}
                    </div>
                    <div className="product-details-price">
                        {sku.price || 100 } USD
                    </div>
                    <div className="product-details-color">
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
                            <img src="https://cdn1.vectorstock.com/i/1000x1000/65/60/business-online-shop-computer-monitor-store-icon-vector-17026560.jpg" alt="" />
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
        </div>
    )
}

export default ProductDetails
