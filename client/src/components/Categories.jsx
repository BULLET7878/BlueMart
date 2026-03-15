import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {

  const { navigate } = useAppContext();

  return (
    <section className='mt-20'>
      <div className="flex items-center justify-between border-b-2 border-primary/10 pb-4 mb-10">
        <div>
          <h2 className='text-3xl md:text-4xl font-black text-gray-900 tracking-tight'>
            Shop by <span className="text-primary italic">Category</span>
          </h2>
          <p className="text-gray-500 font-medium mt-1">Freshly picked favorites just for you</p>
        </div>
        <button 
          onClick={() => navigate('/products')}
          className="hidden md:flex items-center gap-2 text-primary font-black text-sm hover:translate-x-1 transition-transform cursor-pointer"
        >
          VIEW ALL <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className='flex overflow-x-auto no-scrollbar gap-6 md:gap-10 py-5 -mx-4 px-4'>
        {categories.map((category, index) => (
          <div key={index} className='flex-shrink-0 flex flex-col items-center group cursor-pointer'
            onClick={() => {
              navigate(`/product-category/${category.path}`)
            }}
          >
            <div 
              className='w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center premium-shadow group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 border-4 border-white'
              style={{ backgroundColor: `${category.bgColor}dd` }}
            >
              <img src={category.image} alt={category.text} className='w-[70%] h-[70%] object-contain group-hover:scale-115 transition-transform duration-500' />
            </div>
            <p className='mt-5 text-sm md:text-base font-black text-gray-800 group-hover:text-primary transition-colors text-center w-24 md:w-32 truncate px-2'>
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories
