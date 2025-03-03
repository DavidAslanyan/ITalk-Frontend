"use client";
import React, { useState, useMemo } from 'react';
import LevelMap from '../components/level-map';
import TermScrollable from '../components/term-scrollable';
import SearchBlock from '../components/search-block';
import DoughnutChart from '../components/doughnut-chart';
import LearnButton from '../components/buttons/learn-button';
import { DASHBOARD_URL, TERMS_URL } from '../utilities/constants/global-urls';
import { getUserQuery } from '../services/queries/auth.query';


const DashboardHome = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { data: user, isLoading, isError } = getUserQuery();

  const userMappedData = useMemo(() => {
    if (!user) return null;
    return {
      username: `${user.data.firstName} ${user.data.lastName}`,
      progress: user.data.progress ?? 0, 
    };
  }, [user]);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }


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
