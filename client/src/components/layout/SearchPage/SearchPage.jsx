import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../../Context/Product'
import Product from '../../view/Product/Product'

function SearchPage() {
    const {GetProductBySearch} = useContext(ProductContext)
    const {key} = useParams()

    useEffect(() =>GetProductBySearch(key),[key])
    return (
        <>
            <Product />
        </>
    )
}

export default SearchPage
