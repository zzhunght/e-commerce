import React , { useState , useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col} from 'antd'
import {StallContext} from '../../../Context/Stall'
import './MyStallStyle.css'

function MyStall() {
    const {GetStall,StallState:{stalls}} = useContext(StallContext)

    useEffect(() =>GetStall(),[])
    return (
        <div className="stall-wr">
        {stalls?.length >0 ?(
            <Row className="stall-list stall-row">
                {stalls.map((item,i) =>(
                    <Col key={i}>

                    </Col>
                ))}
                <Link to="/stall/add" className="not-stall-item-btn">
                    Thêm Sản Phẩm Mới
                </Link>
            </Row>
        ):(
            <div className="not-stall-item">
                <div className="not-stall-item-title">
                    Bạn Chưa Bán Sản Phẩm nào !!!!!!!!
                </div>
                <Link to="/stall/add" className="not-stall-item-btn">
                    Bán Hàng Ngay
                </Link>
            </div>
        )}
        </div>
    )
}

export default MyStall
