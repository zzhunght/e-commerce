import React , {useContext , useState, useEffect } from 'react'
import { ProductContext } from '../../../Context/Product'
import { CartContext } from '../../../Context/Cart'
import { useParams } from 'react-router-dom'
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
            quantity:quantity
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
            </div>
        </div>
    )
}

export default ProductDetails
