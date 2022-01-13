import React , { useState , useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {StallContext} from '../../../Context/Stall'
import {AuthContext} from '../../../Context/Auth'
import './MyStallStyle.css'
import { LoadingOutlined } from '@ant-design/icons'

function MyStall() {
    const {GetStall,StallState:{stalls,stallLoading},FindItem,DeleteItem} = useContext(StallContext)
    const {authState:{isAuthenticated}} = useContext(AuthContext)

    useEffect(() =>GetStall(),[isAuthenticated])
    return (
        <div className="stall-wr">
            {
                stallLoading ? (
                    <div className="loading black">
                        <LoadingOutlined />
                    </div>
                ) : (
                    <>
                        <div className="stall-description">
                            <div className="stall-length">
                                <p>{stalls.length} sản Phẩm</p>
                            </div>
                            <Link to="/stall/add" className="not-stall-item-btn">
                                Thêm Sản Phẩm Mới
                            </Link>
                        </div>
            
                        {
                            stalls?.length >0 ?
                            (
                            <table className="stall-list stall-table">
                                <tr>
                                    <th className="stall-table-name-title">Tên sản Phẩm </th>
                                    <th className="stall-table-sku-title">Phân loại hàng</th>
                                    <th className="stall-table-price-title">Giá</th>
                                    <th className="stall-table-status-title">Tình Trạng </th>
                                    <th className="stall-table-edit-title">Sửa Thông tin</th>
                                </tr>
                                {stalls.map((item,i) =>(
                                    <tr key={i} className="stall-tr">
                                        <th className="stall-table-name">
                                            <div className="stall-table-item-img">
                                                <img src={item.imageUrl} alt="" />
                                            </div>
                                            <p>{item.name}</p>
                                        </th>
                                        <th className="stall-table-sku">
                                            {item.skus.map((s,i) => (
                                                <div key={i}>
                                                    {s.size}
                                                </div>
                                            ))}
                                        </th>
                                        <th className="stall-table-price">
                                            {item.skus.map((s,i) => (
                                                <div key={i}>
                                                    {s.price}
                                                </div>
                                            ))}
                                        </th>
                                        <th
                                        className={`stall-table-status ${item.status === 'available' ? 'available' :'unavailable'}`}
                                        >
                                            {item.status === 'available' ? 'Còn hàng' :'Hết Hàng'}
                                        </th>
                                        <th className="stall-table-edit">
                                            <Link to={`/stall/edit`} className="item-edit" onClick={()=>FindItem(item._id)}> Sửa</Link>
                                            <div className="item-delete" onClick={()=>DeleteItem(item._id)}> Xoá</div>
                                        </th>
                                    </tr>
                                ))}
                                
                            </table>
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
                    </>
                )
            }
        </div>
    )
}

export default MyStall
