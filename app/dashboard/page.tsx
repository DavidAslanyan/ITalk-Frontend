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
import DashboardContainer from '../components/dashboard-container';
import { fetchTermsLevelBased } from '../utilities/functions/fetch-terms-level-based';
import { DifficultyLevel } from '../utilities/enums/difficulty-level.enum';
import { PROGRESS_POINTS } from '../utilities/constants/global-data';
import ButtonStandard from '../components/buttons/button-standard';


const DashboardHome = () => {
  const [inputValue, setInputValue] = useState<string>("");

  // const { data: user, isLoading } = getUserQuery();
  const userMappedData = useMemo(() => {
    // if (!user) return null;
    return {
      // username: `${user.data.firstName} ${user.data.lastName}`,
      // progress: user.data.progress, 
      username: "David Aslanyan",
      progress: 5,
      points: 175,
      difficultyLevel: DifficultyLevel.EASY
    };
  }, []); //user

  // if (isLoading) {
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //     </div>
  //   )
  // }

  const { current, next } = determinePrize(userMappedData.points);
  const curProgress = userMappedData?.progress;
  const termsLevelBased = fetchTermsLevelBased(userMappedData?.difficultyLevel); 
  const termData = termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS);

  return (
    <div className='w-full max-w-[70rem] mx-auto pr-4'>
      <div className='pt-3'>
        <SearchBlock value={inputValue} setValue={setInputValue} />
      </div>

      <section className='pt-7 flex flex-col lg:flex-row justify-between gap-3'>
        <DashboardContainer>
          <div className='p-5 pt-10 md:pt-7 flex items-center justify-between gap-3'>
            <div className='flex flex-col'>
              <h3 className='text-2xl text-secondary font-bold'>Hi, {userMappedData?.username}</h3>
              <p className='pt-6'>Current score: <span className='text-secondary font-bold text-md md:text-xl'>{userMappedData.points}</span></p>
              <p>Current level: <span className='text-secondary font-bold text-md md:text-xl'>Frozen Lakes</span></p>
            </div>

            <div className='flex flex-col items-center'>
              {current.icon}
              <p className='text-primary font-bold text-base text-center md:text-lg'>{current.title}</p>
            </div>
          </div>
        </DashboardContainer>

        <DashboardContainer>
          <div className='p-5 pt-10 md:pt-7 flex gap-2 items-center sm:items-start'>
            <div className='flex flex-col'>
              <h3 className='text-2xl text-secondary font-bold'>Your Next Terms to Learn</h3>
              <ul>
                <li className='text-secondary font-medium'>1. {termData[0]?.term}</li>
                <li className='text-secondary font-medium'>2. {termData[1]?.term}</li>
                <li className='hidden sm:block text-secondary font-medium'>3. {termData[2]?.term}</li>
                <li className='pl-4 text-secondary font-medium'>and more...</li>
              </ul>
            </div>

            <div className='hidden sm:block relative bottom-6 left-4'>
              <LearnButton url={`${DASHBOARD_URL}/${TERMS_URL}`} title='Learn' size='large' />
            </div>

            <div className='sm:hidden'>
              <ButtonStandard title='Learn' />
            </div>
          </div>
        </DashboardContainer>

      </section>

      <section className='pt-5 flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full'>
          <p className='py-2 text-secondary font-medium'>Keep going to earn your next prize!</p>
          <SmallProgressBar maxWidth='w-full' progress={userMappedData.points} limit={next.points} />
        </div>

        <div className='flex flex-col items-center w-full max-w-[10rem] pt-5 md:pt-0'>
          <p className='text-gray-500 font-bold'>Next Prize</p>
          <div>{next.icon}</div>
          <p className='text-primary font-bold text-lg'>{next.title}</p>
        </div>
      </section>

      <h3 className='text-xl text-secondary font-bold pt-10'>See Your Journey</h3>
      <div className='my-4 h-[0.12rem] max-w-[60rem] bg-gray-300 rounded-full'></div>
      
      <div className='hidden md:block pt-2'>
        <LevelMap progress={userMappedData?.progress ?? 0} limit={1500} />
      </div>

      <div className='block md:hidden pt-20'>
        <LevelMap progress={userMappedData?.progress ?? 0} limit={1500} />
      </div>

      <div className='my-4 h-[0.12rem] max-w-[60rem] bg-gray-300 rounded-full'></div>
    </div>
  );
};

export default DashboardHome;
