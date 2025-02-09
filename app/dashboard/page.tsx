import React from 'react'
import easyTermsData from "../data/easy-terms.json";
import LevelMap from '../components/level-map';
import TermScrollable from '../components/term-scrollable';
import SearchBlock from '../components/search-block';

const data = {
  username: "David Aslanyan"
}

const DashboardHome = () => {
  
  return (
    <div>
      <div className=''>
        <SearchBlock />
      </div>

      <section>
        <div className='flex items-center gap-3'>
          <span className='text-xl text-secondary font-bold pt-10'>Welcome back,</span>
          <h1 className='text-4xl text-secondary font-bold pt-10'>{data.username}</h1>
        </div>

        <h3 className='text-xl text-secondary font-bold pt-10'>Progress</h3>

        <h3 className='text-xl text-secondary font-bold pt-10'>See Your Journey</h3>
        <div className='my-4 h-[0.12rem] max-w-[60rem] bg-gray-300 rounded-full'></div>
      </section>

      <div className='hidden md:block pt-2'>
        <TermScrollable>
          <LevelMap progress={500} limit={1500} />
        </TermScrollable>
      </div>

      <div className='block md:hidden pt-20'>
        <LevelMap progress={500} limit={1500} />
      </div>

      <div className='my-4 h-[0.12rem] max-w-[60rem] bg-gray-300 rounded-full'></div>
    </div>
  )
}

export default DashboardHome;

