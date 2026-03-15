import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const MainBanner = () => {
  return (
    <section className='relative w-full h-[400px] md:h-[520px] lg:h-[600px] overflow-hidden rounded-2xl md:rounded-3xl premium-shadow group'>
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
        <img
          src={assets.main_banner_bg}
          alt="Premium Groceries"
          className="w-full h-full object-cover hidden md:block"
        />
        <img
          src={assets.main_banner_bg_sm}
          alt="Premium Groceries"
          className="w-full h-full object-cover md:hidden"
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:from-black/40" />
      </div>

      {/* Content Overlay - Glassmorphic Box */}
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-center px-6 md:pl-20 lg:pl-32 z-10'>
        <div className="backdrop-blur-md bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl max-w-xl animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 mb-6 bg-accent text-gray-900 text-xs font-black uppercase tracking-widest rounded-full">
            BluMart Exclusive
          </span>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] md:leading-[1.1]'>
            Freshness You <span className="text-accent underline decoration-4 underline-offset-8">Can Trust</span>
          </h1>
          <p className="mt-6 text-gray-100/90 text-lg md:text-xl font-medium max-w-md">
            Savings you'll love on every order. Fast delivery straight to your door.
          </p>
        
          <div className='flex flex-col sm:flex-row items-center mt-10 gap-4'>
            <Link
              to={"/products"}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-accent hover:bg-accent-dark transition-all duration-300 rounded-xl text-gray-900 font-black text-lg shadow-xl shadow-accent/20 active:scale-95"
            >
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              to={"/products"}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 rounded-xl text-white font-black text-lg active:scale-95"
            >
              Explore Deals
            </Link>
          </div>
        </div>
      </div>

      {/* ⚡ Dynamic Accent Decoration */}
      <div className="absolute bottom-10 right-10 hidden lg:block animate-bounce z-20">
        <div className="bg-accent/90 p-4 rounded-full shadow-2xl backdrop-blur-md border border-white/20">
           <p className="text-gray-900 font-black text-xs leading-none text-center">UP TO <br/><span className="text-2xl">50%</span> <br/> OFF</p>
        </div>
      </div>
    </section>
  )
}

export default MainBanner
