import React from 'react'
import {useParams} from 'react-router-dom'
import Product from '../../view/Product/Product'

function CategoriesProduct() {
    const {id} = useParams()
    return (
        <>
            <Product category={id} />
        </>
    )
}

export default CategoriesProduct
