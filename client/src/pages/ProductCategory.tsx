import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {

    const { categoryName } = useParams()
    const { products } = useAppContext()
    const [categoryProducts, setCategoryProducts] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            const tempProducts = products.filter(item => item.category === categoryName)
            setCategoryProducts(tempProducts)
        }
    }, [products, categoryName])

    return (
        <div className='mt-20'>
            <div className='flex flex-col items-center mb-10'>
                <p className='text-3xl font-medium uppercase'>{categoryName}</p>
                <div className='w-20 h-1 bg-primary rounded-full mt-2'></div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {categoryProducts.map((item, index) => (
                    <ProductCard key={index} product={item} />
                ))}
            </div>

            {categoryProducts.length === 0 && (
                <div className='flex justify-center items-center h-[50vh]'>
                    <p className='text-xl text-gray-500'>No products found in this category.</p>
                </div>
            )}
        </div>
    )
}

export default ProductCategory