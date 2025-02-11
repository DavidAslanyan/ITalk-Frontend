import React from 'react'
import easyTermsData from "../data/easy-terms.json";
import LevelMap from '../components/level-map';
import TermScrollable from '../components/term-scrollable';
import SearchBlock from '../components/search-block';
import DoughnutChart from '../components/doughnut-chart';
import LearnButton from '../components/buttons/learn-button';

const data = {
  username: "David Aslanyan",
  progress: 150,
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

        <section>
          <h3 className='text-xl text-secondary font-bold pt-10'>Progress</h3>
          <div className='flex'>
            <DoughnutChart progress={data.progress} limit={300} />
            <div className='hidden md:block pt-20 pl-10'>
              <LearnButton url='/' title='Start' size='large' />
            </div>
            <div className='md:hidden pt-20'>
              <LearnButton url='/' title='Start' size='medium' />
            </div>
          </div>
        </section>

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

