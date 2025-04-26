import { FRAMES } from "../constants/shop-items";

export const selectFrameColor = (color: string): string => {
  switch (color) {
    case FRAMES.black:
      return "border-secondary";
    case FRAMES.white:
      return "border-white";
    case FRAMES.gray:
      return "border-gray-500";
    case FRAMES.green:
      return "border-green-600";
    case FRAMES.blue:
      return "border-blue-600";
    case FRAMES.lightBlue:
      return "border-sky-500";
    case FRAMES.orange:
      return "border-orange-600";
    case FRAMES.purple:
      return "border-purple-600";
    case FRAMES.red:
      return "border-red-600";
    case FRAMES.yellow:
      return "border-yellow-500";
    case FRAMES.pink:
      return "border-pink-500";
    case FRAMES.teal:
      return "border-teal-500";
    case FRAMES.lime:
      return "border-lime-500";
    case FRAMES.indigo:
      return "border-indigo-500";
    case FRAMES.rose:
      return "border-rose-500";
    case FRAMES.amber:
      return "border-amber-500";
    case FRAMES.cyan:
      return "border-cyan-500";
    case FRAMES.emerald:
      return "border-emerald-500";
    case FRAMES.violet:
      return "border-violet-500";

    default:
      return "border-thirdly"; 
  }
};

