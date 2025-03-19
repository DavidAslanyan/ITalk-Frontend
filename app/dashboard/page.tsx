"use client";
import React, { useState, useMemo } from 'react';
import LevelMap from '../components/level-map';
import TermScrollable from '../components/term-scrollable';
import SearchBlock from '../components/search-block';
import DoughnutChart from '../components/doughnut-chart';
import LearnButton from '../components/buttons/learn-button';
import { DASHBOARD_URL, TERMS_URL } from '../utilities/constants/global-urls';
import { getUserQuery } from '../services/queries/auth.query';
import SmallProgressBar from '../components/small-progress-bar/SmallProgressBar';
import { determinePrize, PRIZES } from '../utilities/functions/map-prizes';


const DashboardHome = () => {
  const [inputValue, setInputValue] = useState<string>("");

  // const { data: user, isLoading } = getUserQuery();
  const userMappedData = useMemo(() => {
    // if (!user) return null;
    return {
      // username: `${user.data.firstName} ${user.data.lastName}`,
      // progress: user.data.progress, 
      username: "David Aslanyan",
      progress: 150,
      points: 175
    };
  }, []); //user

  // if (isLoading) {
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //     </div>
  //   )
  // }

  const total = 52500;
  const { current, next } = determinePrize(userMappedData.points);

  return (
    <div>
      <div>
        <SearchBlock value={inputValue} setValue={setInputValue} />
      </div>

      <section>
        <div className='flex items-center gap-3'>
          <span className='text-xl text-secondary font-bold pt-10'>Welcome back,</span>
          <h1 className='text-4xl text-secondary font-bold pt-10'>{userMappedData?.username}</h1>
        </div>

        <section className='flex flex-col md:flex-row items-center'>
          <div className='w-full max-w-[40rem]'>
            <p className='py-2 text-secondary font-medium'>Keep going to earn your next prize!</p>
            <SmallProgressBar progress={userMappedData.points} limit={next.points} />
          </div>

          <div className='flex flex-col items-center w-full max-w-[10rem] pt-5 md:pt-0'>
            <p className='text-gray-500 font-bold'>Next Prize</p>
            <div>{next.icon}</div>
            <p className='text-primary font-bold text-lg'>{next.title}</p>
          </div>
        </section>

        <section>
          <h3 className='text-xl text-secondary font-bold pt-10'>Progress</h3>
          <div className='flex'>
            <DoughnutChart progress={userMappedData?.progress ?? 0} limit={300} />
            <div className='hidden md:block pt-20 pl-10'>
              <LearnButton url={`${DASHBOARD_URL}/${TERMS_URL}`} title='Start' size='large' />
            </div>
            <div className='md:hidden pt-20'>
              <LearnButton url={`${DASHBOARD_URL}/${TERMS_URL}`} title='Start' size='medium' />
            </div>
          </div>
        </section>

        <h3 className='text-xl text-secondary font-bold pt-10'>See Your Journey</h3>
        <div className='my-4 h-[0.12rem] max-w-[60rem] bg-gray-300 rounded-full'></div>
      </section>

      <div className='hidden md:block pt-2'>
        <TermScrollable>
          <LevelMap progress={userMappedData?.progress ?? 0} limit={1500} />
        </TermScrollable>
      </div>

      <div className='block md:hidden pt-20'>
        <LevelMap progress={userMappedData?.progress ?? 0} limit={1500} />
      </div>

      <div className='my-4 h-[0.12rem] max-w-[60rem] bg-gray-300 rounded-full'></div>
    </div>
  );
};

export default DashboardHome;
