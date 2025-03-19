import Prize1Icon from "@/app/components/icons/prizes/Prize1Icon";

export const determinePrize = (points: number) => {
  for (let i = 0; i < PRIZES.length; i++) {
    if (points <= PRIZES[i].points) {
      if (i === 0) {
        return {
          current: PRIZES[0],
          next: PRIZES[1]
        }
      }

      return {
        current: PRIZES[i - 1],
        next: PRIZES[i]
      }
    } 
  }

  return {
      current: PRIZES[PRIZES.length - 1],
      next: PRIZES[PRIZES.length - 1]
  }
}


export const PRIZES = [
  // Bronze Tier (Beginner)
  { title: "Bronze Novice", points: 0, icon: <Prize1Icon color="#CD7F32" /> },
  { title: "Bronze Adept", points: 700, icon: <Prize1Icon color="#CD7F32" /> },
  { title: "Bronze Warrior", points: 1400, icon: <Prize1Icon color="#CD7F32" /> },
  { title: "Bronze Master", points: 2100, icon: <Prize1Icon color="#CD7F32" /> },

  // Silver Tier (Intermediate)
  { title: "Silver Explorer", points: 2800, icon: <Prize1Icon color="#C0C0C0" /> },
  { title: "Silver Challenger", points: 4200, icon: <Prize1Icon color="#C0C0C0" /> },
  { title: "Silver Conqueror", points: 5600, icon: <Prize1Icon color="#C0C0C0" /> },
  { title: "Silver Elite", points: 7000, icon: <Prize1Icon color="#C0C0C0" /> },

  // Gold Tier (Advanced)
  { title: "Golden Hero", points: 8400, icon: <Prize1Icon color="#FFD700" /> },
  { title: "Golden Champion", points: 10500, icon: <Prize1Icon color="#FFD700" /> },
  { title: "Golden Legend", points: 12600, icon: <Prize1Icon color="#FFD700" /> },
  { title: "Golden Myth", points: 14700, icon: <Prize1Icon color="#FFD700" /> },

  // Purple Tier (Expert)
  { title: "Purple Phantom", points: 16800, icon: <Prize1Icon color="#800080" /> },
  { title: "Purple Overlord", points: 19600, icon: <Prize1Icon color="#800080" /> },
  { title: "Purple Demigod", points: 22400, icon: <Prize1Icon color="#800080" /> },
  { title: "Purple Celestial", points: 25200, icon: <Prize1Icon color="#800080" /> },

  // Emerald Tier (Ultimate)
  { title: "Emerald Guardian", points: 28000, icon: <Prize1Icon color="#50C878" /> },
  { title: "Emerald Titan", points: 31500, icon: <Prize1Icon color="#50C878" /> },
  { title: "Emerald Ascendant", points: 35000, icon: <Prize1Icon color="#50C878" /> },
  { title: "Emerald Eternal", points: 38500, icon: <Prize1Icon color="#50C878" /> },

  // Sapphire Tier (Final Prestige)
  { title: "Sapphire Sovereign", points: 42000, icon: <Prize1Icon color="#0F52BA" /> },
  { title: "Sapphire Emperor", points: 46200, icon: <Prize1Icon color="#0F52BA" /> },
  { title: "Sapphire Supreme Overlord", points: 50500, icon: <Prize1Icon color="#0F52BA" /> },

  // Ultimate Max Level
  { title: "Celestial God", points: 52500, icon: <Prize1Icon color="#E0115F" /> }, // Royal Pink for Ultimate
];


