import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products, navigate } = useAppContext()

  return (
    <section className='mt-24'>
      <div className="flex items-center justify-between border-b-2 border-primary/10 pb-4 mb-10">
        <div>
          <h2 className='text-3xl md:text-4xl font-black text-gray-900 tracking-tight'>
            Daily <span className="text-primary italic">Bestsellers</span>
          </h2>
          <p className="text-gray-500 font-medium mt-1">Top products at unbeatable prices</p>
        </div>
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-primary font-black text-sm hover:translate-x-1 transition-transform cursor-pointer"
        >
          VIEW MORE <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10 mt-10'>
        {products
          .filter(product => product.inStock)
          .slice(0, 10)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </section>
  )
}

export default BestSeller;
