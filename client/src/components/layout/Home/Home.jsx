import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../../Context/Product'
import Carousel from '../../view/Carousel/Carousel'
import Category from '../../view/Category/Category'
import Product from '../../view/Product/Product'
import './Homestyle.css'
function Home() {
    const {getProduct,productState:{products,productLoading}} = useContext(ProductContext)
    useEffect(() =>getProduct(),[])
    return (
        <div className="home-wrapper">
            <Carousel />
            <Category />
            <Product />
        </div>
    )
}

export default Home
