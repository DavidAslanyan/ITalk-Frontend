"use client"
import React, { useEffect, useMemo, useState } from 'react'
import easyTermsData from "../../data/easy-terms.json";
import TermSwiper from '@/app/components/term-swiper';
import Stopwatch from '@/app/components/stopwatch';
import ButtonStandard from '@/app/components/buttons/button-standard';
import { getUserQuery } from '@/app/services/queries/auth.query';
import { clearPassedGamesMutation, updateProgressMutation } from '@/app/services/queries/progress.query';
import { MINIMUM_GAMES_PASSED, PROGRESS_POINTS } from '@/app/utilities/constants/global-data';


const title = "Ready to learn some new tech terms? -Jump right into the game";
const steps = [
  "This is a step to explain the process of the game",
  "This is a step to explain the process of the game",
  "This is a step to explain the process of the game",
  "This is a step to explain the process of the game"
];


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
      points: user.data.points
    };
  }, [user]);

  const { mutate: updateProgress } = updateProgressMutation();
  const { mutate: clearPassedGames } = clearPassedGamesMutation();

  useEffect(() => {
    if (userMappedData?.gamesPassed.length >= MINIMUM_GAMES_PASSED) {
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
  }, [user]);

  const curProgress = userMappedData?.progress;
  const termData = easyTermsData.slice(curProgress, curProgress + PROGRESS_POINTS);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!gameLive) {
    return (
      <div className='h-[140vh] md:h-auto'>
      <section className='pt-10'>
        <h1 className='text-xl text-secondary font-bold'>{title}</h1>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{index + 1}. {step}</li>
          ))}
        </ul>
      </section>

      <section className='pt-36'>
        <h3 className='text-xl text-secondary font-bold'>Terms you are going to learn today</h3>
        <ul>
          {termData.map((data, index) => (
            <li key={index}>{index + 1}. {data.term}</li>
          ))}
        </ul>
      </section>

      <div className='pt-10'>
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
