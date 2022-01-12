import { StarOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React,{ useState, useContext , useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { SellerContext } from '../../../Context/SellerStall'
import ProductItem from '../../view/Product/ProductItem'
import './SellerStallStyle.css'
function SellerStall() {
    const param = useParams()
    const id = param.id

    //gloabl State
    const {GetShop, SellerState:{products,shopLoading,shop}} = useContext(SellerContext)
    
    //


    //useEffect
    useEffect(() =>GetShop(id),[])
    return (
        <>
            {shopLoading ? (
                <div className="Loading"> Loading... </div>
            ):(
                <div className="sl-wr">
                    <div className="sl-ct">
                        <div className="sl-header">
                            <div className="sl-details">
                                <div className="sl-img">
                                    <img src="https://cdn1.vectorstock.com/i/1000x1000/65/60/business-online-shop-computer-monitor-store-icon-vector-17026560.jpg" alt="" />
                                </div>
                                <div className="sl-des">
                                    <div className="sl-name">
                                        {shop.firstName} {shop.lastName}
                                    </div>
                                    <div className="sl-sub-des">
                                        <div className="sl-rating">
                                            <StarOutlined className="star" /> 0/5
                                        </div>
                                        <div className="sl-follower">
                                            <UsergroupAddOutlined className="user-follower" /> Người theo dõi: 0
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sl-follow-btn">
                                <div className="follow-shop sl-follow-btn">
                                    + Theo Dõi
                                </div>  
                            </div>
                        </div>

                        <div className="sl-product-wr">
                            <div className="sl-product-header">
                                Tất Cả Sản Phẩm
                            </div>

                            <div className="sl-product-list">
                                <Row className="products-row" gutter={[16,16]}>
                                    {products?.map(item =>(
                                        <ProductItem item={item} />
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        
        </>
    )
}

export default SellerStall
