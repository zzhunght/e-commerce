import React, { useContext, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { ProductContext } from '../../../Context/Product'
import Product from '../../view/Product/Product'

function CategoriesProduct() {
    const {id} = useParams()
    const {getProduct,GetProductByCategory,productState:{products,productLoading}} = useContext(ProductContext)

    useEffect(() =>GetProductByCategory(id),[id])
    return (
        <>
            <Product  />
        </>
    )
}

export default CategoriesProduct
