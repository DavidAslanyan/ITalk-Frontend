import GameTab from "@/app/components/game-tab";
import SearchBlock from "@/app/components/search-block";
import React from "react";

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
    title: "Feed the Dino",
    gif: "/games/giphy.gif",
    image: "/games/sample.jpg",
    url: "games/feed-dino",
  },
];

const Games = () => {
  return (
    <div className="min-h-[160vh] sm:h-auto">
      <div className='pt-2 md:pt-12'>
        <SearchBlock />
      </div>

      <div className="flex flex-col ">
        <section>
          <h1 className="pt-10 text-xl text-secondary font-bold">
            Practice Makes it Perfect
          </h1>
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
