import React from 'react'
import { Row , Col } from 'antd'
import { Link } from 'react-router-dom'

function ProductItem({item}) {
    return (
        <>
            <Col key={item._id} className="products-col" xl={4} md={6} sm={8} xs={12}>
                <Link to={`/${item._id}`} className="link">
                    <div className="card">
                        <div className="card-item-img">
                            <img src={item.imageUrl} alt="card-img" />
                        </div>
                        <div className="card-item-details">
                            <p className="card-item-name">{item.name}</p>
                        </div>
                        {/* <div className="add-to-cart">
                            <p>Add to Cart</p>
                        </div> */}
                    </div>
                </Link>
            </Col>
        </>
    )
}

export default ProductItem
