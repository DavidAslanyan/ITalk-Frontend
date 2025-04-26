import { DifficultyLevel } from "../enums/difficulty-level.enum"
import easyTermsData from "../../data/easy-terms.json";
import mediumTermsData from "../../data/medium-terms.json";
import hardTermsData from "../../data/hard-terms.json";


export const fetchTermsLevelBased = (difficulty?: DifficultyLevel) => {
  switch(difficulty) {
    case DifficultyLevel.EASY:
      return easyTermsData;
    case DifficultyLevel.MEDIUM:
      return mediumTermsData;
    case DifficultyLevel.HARD:
      return hardTermsData;
    
    default:
      return easyTermsData;
  }
};

