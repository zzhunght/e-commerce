import React , { useContext, useEffect, useState } from 'react';
import { Row , Col } from 'antd'
import { ProductContext } from '../../../Context/Product'
import { LoadingOutlined } from '@ant-design/icons'
import './ProductStyle.css'
import ProductItem from './ProductItem';

function Product() {
    
    const {productState:{products,productLoading}} = useContext(ProductContext)


    return (
        <div className="products-wrapper">
            <Row className="products-row" gutter={[16,16]}>
                
                {
                    productLoading ? 
                    (
                        <div className="loading">
                            <LoadingOutlined style={{fontSize:'35px',color:'#000'}}/>
                            <h2>Loading...</h2>
                        </div>
                    ):(
                        products.length > 0 ? (
                            products?.map(item =>(
                                <ProductItem item={item}  key={item._id}/>
                            ))
                        ) : (
                            <div className="no-products-to-show">
                                <div className="no-products-to-show-img">
                                    <img src="https://dbeautyloungeindia.com/wp-content/uploads/2021/05/nproduct.png" alt="" />
                                </div>
                                <p className="no-products-to-show-title">
                                    Tìm kiếm của bạn không phù hợp với bất kì sản phẩm nào. Vui lòng thử lại!
                                </p>
                            </div>
                        )
                    )
                }
                
            </Row>
        </div>
    )
}

export default Product
