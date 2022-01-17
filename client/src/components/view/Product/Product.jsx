import React , { useContext, useEffect, useState } from 'react';
import { Row , Col } from 'antd'
import { ProductContext } from '../../../Context/Product'
import { LoadingOutlined } from '@ant-design/icons'
import './ProductStyle.css'
import ProductItem from './ProductItem';

function Product({category}) {
    
    const {productState:{products,productLoading}} = useContext(ProductContext)


    return (
        <div className="products-wrapper">
            <Row className="products-row" gutter={[16,16]}>
                
                {
                    productLoading ? 
                    (
                        <div className="loading">
                        <LoadingOutlined />
                        </div>
                    ):(
                        products?.map(item =>(
                            <ProductItem item={item}  key={item._id}/>
                        ))
                    )
                }
                
            </Row>
        </div>
    )
}

export default Product
