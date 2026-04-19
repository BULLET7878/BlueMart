import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='mt-8 flex flex-col gap-12' >
        <MainBanner/>
        <div className="flex flex-col gap-12">
          <Categories/>
          <BestSeller/>
          <BottomBanner/>
          <NewsLetter/>
        </div>
    </div>
  )
}

export default Home