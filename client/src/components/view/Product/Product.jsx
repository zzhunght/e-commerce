import React , { useContext, useEffect, useState } from 'react';
import { Row , Col } from 'antd'
import { ProductContext } from '../../../Context/Product'
import { LoadingOutlined } from '@ant-design/icons'
import './ProductStyle.css'
import ProductItem from './ProductItem';

function Product({category}) {
    
    const {getProduct,GetProductByCategory,productState:{products,productLoading}} = useContext(ProductContext)
    useEffect(()=>{
        if(category) return GetProductByCategory(category)
        getProduct()
    },[category])

    return (
        <div className="products-wrapper">
            <Row className="products-row" gutter={[16,16]}>
                {
                    products?.map(item =>(
                        <ProductItem item={item}  key={item._id}/>
                    ))
                }
                {
                    productLoading && 
                    <div className="loading">
                        <LoadingOutlined />
                    </div>
                }
                
            </Row>
        </div>
    )
}

export default Product
