"use client";
import React, { useState } from 'react';
import LevelMap from '../components/level-map';
import SearchBlock from '../components/search-block';
import LearnButton from '../components/buttons/learn-button';
import { DASHBOARD_URL, SEARCH_URL, TERMS_URL } from '../utilities/constants/global-urls';
import SmallProgressBar from '../components/small-progress-bar/SmallProgressBar';
import { determinePrize } from '../utilities/functions/map-prizes';
import DashboardContainer from '../components/dashboard-container';
import { fetchTermsLevelBased } from '../utilities/functions/fetch-terms-level-based';
import { PROGRESS_POINTS } from '../utilities/constants/global-data';
import ButtonStandard from '../components/buttons/button-standard';
import { useRouter } from 'next/navigation';
import ProgressIcon from '../components/icons/ProgressIcon';
import CoinIcon from '../components/icons/CoinIcon';
import { COLORS } from '../utilities/constants/colors';
import Loading from '../components/loading';
import useGetUser from '../utilities/hooks/useGetUser';


const DashboardHome = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");

  const { user, isLoading } = useGetUser();

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    if (inputValue === "") return;
    router.push(`${SEARCH_URL}?term=${inputValue}`);
  }

  if (isLoading || !user) {
    return <Loading />;  
  }

  const { current, next } = determinePrize(user.points);
  const curProgress = user.progress;
  const curCoins = user.coins;
  const termsLevelBased = fetchTermsLevelBased(user.difficultyLevel); 
  const termData = termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS);
  const progressForMap = user.progress * 5;

  return (
    <div className='w-full max-w-[70rem] mx-auto pr-4'>
      <form onSubmit={handleSearchSubmit} className='pt-3'>
        <SearchBlock value={inputValue} setValue={setInputValue} />
      </form>

      <section className='pt-7 flex flex-col lg:flex-row justify-between gap-3'>
        <DashboardContainer>
          <div className='p-5 pt-10 md:pt-7 flex items-center justify-between gap-3'>
            <div className='flex flex-col'>
              <h3 className='text-2xl text-secondary font-bold'>Hi, {user.firstName} {user.lastName}</h3>
              <p className='pt-1 font-bold text-semibold'>XP: <span className='text-secondary font-bold text-md md:text-xl'>{user.points}</span></p>
              <div className='flex items-center gap-2'>
                <CoinIcon width={24} height={24} color={COLORS.orange}/>
                <p>Coins: <span className='text-secondary font-bold text-md md:text-xl'>{curCoins}</span></p>
              </div>
              
              <div className='flex items-center gap-2'>
                <ProgressIcon width={20} height={20} />
                <p>Progress: <span className='text-secondary font-bold text-md md:text-xl'>{curProgress}</span></p>
              </div>
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
              {termData[0]?.term 
              ? 
              <ul>
                <li className='text-secondary font-medium'>1. {termData[0]?.term}</li>
                <li className='text-secondary font-medium'>2. {termData[1]?.term}</li>
                <li className='hidden sm:block text-secondary font-medium'>3. {termData[2]?.term}</li>
                <li className='pl-4 text-secondary font-medium'>and more...</li>
              </ul>
              :
              <p className='text-md font-semibold text-secondary'>All terms completed</p>
              }
            </div>

            <div className='hidden sm:block relative bottom-1 left-4'>
              <LearnButton url={`${DASHBOARD_URL}/${TERMS_URL}`} title='Study' size='large' />
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
          <SmallProgressBar maxWidth='w-full' progress={user.points} limit={next.points} />
          <p className='py-2 text-secondary font-medium'>{user.points} / {next.points} points</p>
        </div>

        <div className='flex flex-col items-center w-full max-w-[10rem] pt-5 md:pt-0'>
          <p className='text-gray-500 font-bold'>Next Prize</p>
          <div>{next.icon}</div>
          <p className='text-primary text-center font-bold text-lg'>{next.title}</p>
        </div>
      </section>

      <h3 className='text-xl text-secondary font-bold pt-10'>See Your Journey</h3>
      <div className='my-4 h-[0.12rem] w-full  bg-gray-300 rounded-full'></div>

      <div className='py-20 md:pt-2 w-full'>
        {/* progressForMap  ?? 0 */}
        <LevelMap progress={800} limit={1500} />
      </div>

      <div className='my-4 h-[0.12rem] w-full bg-gray-300 rounded-full'></div>
    </div>
  );
};

export default DashboardHome;
