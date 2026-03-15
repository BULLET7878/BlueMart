import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <section className='mt-32'>
      <div className="grid lg:grid-cols-2 gap-10 items-center bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/5 overflow-hidden relative">
        {/* Abstract Background Element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <h2 className='text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-8' >
            Why <span className="text-primary">BluMart</span> is the <br/><span className="italic">Better Way</span> to Shop
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className='flex flex-col gap-4 p-6 bg-white rounded-3xl premium-shadow hover:scale-105 transition-transform duration-300 border border-gray-50'>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <img src={feature.icon} alt={feature.title} className='w-6 h-6'/>
                  </div>
                  <div>
                    <h3 className='text-lg font-black text-gray-900 mb-1' >{feature.title}</h3>
                    <p className='text-gray-500 font-medium text-xs leading-relaxed'>{feature.description}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block h-full">
           <img src={assets.bottom_banner_image} alt='Market' className='w-full h-full object-cover rounded-[2rem] shadow-2xl transition hover:rotate-1 duration-700' />
           {/* Floating Badge */}
           <div className="absolute -bottom-6 -left-6 bg-accent p-6 rounded-3xl shadow-xl transform -rotate-3 border-4 border-white">
              <p className="text-gray-900 font-black text-xl italic uppercase tracking-tighter">100% Guaranteed Fresh</p>
           </div>
        </div>
      </div>
    </section>
  )
}    

export default BottomBanner