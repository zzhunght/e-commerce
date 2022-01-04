import React , { useContext, useEffect, useState } from 'react';
import {Link,useParams} from 'react-router-dom'
import { Row , Col } from 'antd'
import { ProductContext } from '../../../Context/Product'
import './ProductStyle.css'

function Product() {
    
    const {getProduct,productState:{products}} = useContext(ProductContext)
    useEffect(()=>getProduct(),[])

    return (
        <div className="products-wrapper">
            <Row className="products-row" gutter={[16,16]}>
                {
                    products?.map(item =>(
                        <Col key={item._id} className="products-col" xl={4} sm={6} xs={12}>
                            <Link to={`/${item._id}`} className="link">
                                <div className="card">
                                    <div className="card-item-img">
                                        <img src={item.imageUrl} alt="card-img" />
                                    </div>
                                    <div className="card-item-details">
                                        <p className="card-item-name">{item.name}</p>
                                    </div>
                                    <div className="add-to-cart">
                                        <p>Add to Cart</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default Product
