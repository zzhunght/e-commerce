import React from 'react'
import Carousel from '../../view/Carousel/Carousel'
import Product from '../../view/Product/Product'
import './Homestyle.css'
function Home() {

    
    return (
        <div className="home-wrapper">
            <Carousel />
            <Product />
        </div>
    )
}

export default Home
