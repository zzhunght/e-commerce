import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../../Context/Product'
import Carousel from '../../view/Carousel/Carousel'
import Product from '../../view/Product/Product'
import './Homestyle.css'
function Home() {
    const {getProduct,productState:{products,productLoading}} = useContext(ProductContext)
    useEffect(() =>getProduct(),[])
    return (
        <div className="home-wrapper">
            <Carousel />
            <Product />
        </div>
    )
}

export default Home
