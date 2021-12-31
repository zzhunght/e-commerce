import React from 'react'
import Carousel from '../../view/Carousel/Carousel'
import Navbar from '../../view/nav/Navbar'
import Product from '../../view/Product/Product'
import './Homestyle.css'
function Home() {

    
    return (
        <div className="home-wrapper">
            <Navbar />
            <Carousel />
            <Product />
        </div>
    )
}

export default Home
