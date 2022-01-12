import React , { useContext, useEffect, useState } from 'react';
import {Link,useParams} from 'react-router-dom'
import { Row , Col } from 'antd'
import { ProductContext } from '../../../Context/Product'
import './ProductStyle.css'
import ProductItem from './ProductItem';

function Product() {
    
    const {getProduct,productState:{products}} = useContext(ProductContext)
    useEffect(()=>getProduct(),[])

    return (
        <div className="products-wrapper">
            <Row className="products-row" gutter={[16,16]}>
                {
                    products?.map(item =>(
                        <ProductItem item={item}  key={item._id}/>
                    ))
                }
            </Row>
        </div>
    )
}

export default Product
