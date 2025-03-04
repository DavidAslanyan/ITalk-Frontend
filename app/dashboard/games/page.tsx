"use client";
import GameTab from "@/app/components/game-tab";
import { getUserQuery } from "@/app/services/queries/auth.query";
import React, { useMemo } from "react";

const GAMES = [
  {
    id: 1,
    title: "Classics - Quiz",
    gif: "/games/giphy.gif",
    image: "/games/sample.jpg",
    url: "games/quiz",
  },
  {
    id: 2,
    title: "Missing Word",
    gif: "/games/giphy.gif",
    image: "/games/sample.jpg",
    url: "games/missing-word",
  },
  {
    id: 3,
    title: "Word Shuffle",
    gif: "/games/giphy.gif",
    image: "/games/sample.jpg",
    url: "games/word-shuffle",
  },
  {
    id: 4,
    title: "Feed the Monster",
    gif: "/games/giphy.gif",
    image: "/games/sample.jpg",
    url: "games/feed-monster",
  },
];

const Games = () => {
  // const { data: user, isLoading, isError } = getUserQuery();
  const userMappedData = useMemo(() => {
    // if (!user) return null;
    // return {
    //   username: `${user.data.firstName} ${user.data.lastName}`,
    //   progress: user.data.progress ?? 0, 
    //   gamesPassed: user.data.gamesPassed,
    //   coins: user.data.coins
    // };
    return {
      username: "Test user",
      progress: 100, 
      gamesPassed: ["quiz"],
      coins: 100
    };
  }, []);
  // [user]

  // if (isLoading) {
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-[160vh] sm:h-auto">

      <div className="flex flex-col ">
        <section>
          <h1 className="pt-10 text-xl text-secondary font-bold">
            Practice Makes it Perfect
          </h1>
        </section>

        <section>
          <p>Coins: <span className="font-bold">{userMappedData?.coins}</span></p>
          <p>Games Passed: <span className="font-bold">{userMappedData?.gamesPassed.length}</span></p>
        </section>

        <section className="pl-5 flex justify-center items-center pt-10 w-full max-w-[80rem] pb-24">
          <ul className="flex flex-wrap justify-start gap-2 sm:gap-5">
            {GAMES.map((game) => (
              <li key={game.id}>
                <GameTab
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
