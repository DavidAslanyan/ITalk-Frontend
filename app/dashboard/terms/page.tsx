"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import TermSwiper from '@/app/components/term-swiper';
import Stopwatch from '@/app/components/stopwatch';
import ButtonStandard from '@/app/components/buttons/button-standard';
import { getUserQuery } from '@/app/services/queries/auth.query';
import { clearPassedGamesMutation, updateProgressMutation } from '@/app/services/queries/progress.query';
import { MINIMUM_GAMES_PASSED, PROGRESS_POINTS } from '@/app/utilities/constants/global-data';
import { fetchTermsLevelBased } from '@/app/utilities/functions/fetch-terms-level-based';
import LottieAnimation from '@/app/components/lottie-animations/lottie';
import studyHero from '@/app/components/lottie-animations/study-hero.json';
import Loading from '@/app/components/loading';


const Terms = () => {
  const [gameLive, setGameLive] = useState<boolean>(false);
  const { data: user, isLoading } = getUserQuery();
  const userMappedData = useMemo(() => {
    if (!user) return null;
    return {
      username: `${user.data.firstName} ${user.data.lastName}`,
      progress: user.data.progress ?? 0, 
      gamesPassed: user.data.gamesPassed,
      coins: user.data.coins,
      points: user.data.points,
      difficultyLevel: user.data.difficultyLevel
    };
  }, [user]); 

  const { mutate: updateProgress } = updateProgressMutation();
  const { mutate: clearPassedGames } = clearPassedGamesMutation();

  const progressUpdated = useRef(false);

  useEffect(() => {
    if (!progressUpdated.current && userMappedData?.gamesPassed.length >= MINIMUM_GAMES_PASSED) {
      clearPassedGames();
      progressUpdated.current = true;
      window.location.reload(); 

      updateProgress(
        { progress: PROGRESS_POINTS },
        {
          onSuccess: () => {
            clearPassedGames();
            window.location.reload();
          }
        }
      );
    }
  }, [userMappedData]);

  const curProgress = userMappedData?.progress;
  const termsLevelBased = fetchTermsLevelBased(userMappedData?.difficultyLevel); 
  const termData = termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS);

  if (isLoading) {
    return <Loading />
  }

  if (!gameLive) {
    return (
      <div className='h-[140vh] md:h-screen md:flex flex-col items-center justify-center w-full max-w-[50rem]  mx-auto'>
      <div className='flex flex-col md:flex-row items-center'>
        <section>
          <h3 className='text-xl text-secondary font-bold'>Terms you are going to learn today</h3>
          <ul className='pt-6'>
            {termData.map((data, index) => (
              <li className='text-md text-secondary font-medium' key={index}>{index + 1}. {data.term}</li>
            ))}
          </ul>
        </section>

        <section>
          <LottieAnimation data={studyHero} width='max-w-[20rem]' />
        </section>
      </div>

      <div className='pt-10 flex justify-center'>
        <ButtonStandard title='Begin' onClick={() => setGameLive(true)} />
      </div>
    </div>
    )
  }

  return (
    <div>
      <Stopwatch />
      <div className='flex justify-center items-center h-[120vh] md:h-[90vh]'>
        <div className="w-full max-w-[40rem]">
        <TermSwiper data={termData} />
        </div>
      </div>
    </div>
  )
}

export default Terms;
