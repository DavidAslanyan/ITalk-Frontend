"use client";
import ButtonStandard from "@/app/components/buttons/button-standard";
import GameTab from "@/app/components/game-tab";
import CoinIcon from "@/app/components/icons/CoinIcon";
import Loading from "@/app/components/loading";
import { getUserQuery } from "@/app/services/queries/auth.query";
import { COLORS } from "@/app/utilities/constants/colors";
import { GamesEnum } from "@/app/utilities/constants/game-titles";
import { DASHBOARD_URL, TERMS_URL } from "@/app/utilities/constants/global-urls";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

const GAMES = [
  {
    id: 1,
    title: "Classics - Quiz",
    gif: "/demos/game-1.mp4",
    image: "/games/game-poster-1.png",
    url: "games/quiz",
    name: GamesEnum.QUIZ
  },
  {
    id: 2,
    title: "Missing Word",
    gif: "/demos/game-2.mp4",
    image: "/games/game-poster-2.png",
    url: "games/missing-word",
    name: GamesEnum.MISSING_WORD
  },
  {
    id: 3,
    title: "Word Shuffle",
    gif: "/demos/game-3.mp4",
    image: "/games/game-poster-3.png",
    url: "games/word-shuffle",
    name: GamesEnum.WORD_SHUFFLE
  },
  {
    id: 4,
    title: "Feed the Monster",
    gif: "/demos/game-4.mp4",
    image: "/games/game-poster-4.png",
    url: "games/feed-monster",
    name: GamesEnum.FEED_MONSTER
  },
];

const Games = () => {
  const router = useRouter();
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

  if (isLoading) {
    return (
      <Loading />
    )
  }

  const requiredGames = [GamesEnum.QUIZ, GamesEnum.MISSING_WORD, GamesEnum.WORD_SHUFFLE, GamesEnum.FEED_MONSTER];
  const allGamesPassed = requiredGames.every(game => userMappedData?.gamesPassed.includes(game));

  return (
    <div className="min-h-[160vh] sm:h-auto w-full max-w-[90rem] mx-auto">

      <div className="flex flex-col ">
        <section>
          <h1 className="pt-10 text-xl text-secondary font-bold">
            Practice Makes it Perfect
          </h1>
        </section>


        <section>
          <div className="flex">
            <p className="font-bold pr-1">XP</p> Points: 
            <span className="font-bold">{userMappedData?.points}</span>
          </div>
          <div className="flex items-center gap-1">
            <CoinIcon color={COLORS.orange} />
            <p>Coins: <span className="font-bold">{userMappedData?.coins}</span></p>
          </div>
        </section>

        <p className="pt-10 text-lg text-secondary font-semibold">Complete all the game to unlock new terms</p>

        {allGamesPassed &&
        <section className="flex items-center gap-5">
          <p className="text-md text-green-600 font-bold">Main Games Passed</p>
          <ButtonStandard onClick={() => router.push(`${DASHBOARD_URL}/${TERMS_URL}`)} title="Next Terms" />
        </section>
        }

        <section className="pl-5 flex justify-center items-center pt-10 w-full max-w-[80rem] pb-24">
          <ul className="flex flex-wrap justify-start gap-2 sm:gap-16">
            {GAMES.map((game) => (
              <li key={game.id}>
                <GameTab
                  completed={userMappedData?.gamesPassed.includes(game.name)}
                  gif={game.gif}
                  url={game.url}
                  image={game.image}
                  title={game.title}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
      
    </div>
  );
};

export default Games;
