import React,{ useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { CategoryContext } from '../../../Context/Category'
import './CategoryStyle.css'

function Category() {
    const {CategoryState:{categories}} = useContext(CategoryContext)

    return (
        <div className="category-wr">
            <div className="main-ct-title">Danh Mục Sản Phẩm</div>
            <div className="main-ct-list">
                {categories?.map(category =>(
                    <Link to={`/category/${category._id}/products`} className="main-ct-list-item" key={category._id}>
                        <div className="main-ct-list-item-img">
                            <img src={category.imageUrl} alt="" />
                        </div>
                        <div className="main-ct-list-item-name">
                            {category.label.vi}
                        </div>
                    </Link>
                    
                ))}
            </div>
        </div>
    )
}

export default Category