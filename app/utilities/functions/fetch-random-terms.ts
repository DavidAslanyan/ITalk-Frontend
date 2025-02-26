import easyTermsData from "../../data/easy-terms.json";
import mediumTermsData from "../../data/medium-terms.json";
import hardTermsData from "../../data/hard-terms.json";


export const fetchRandomTerms = (numberOfTerms: number) => {
  const randomlyPickedDifficulty = Math.floor(Math.random() * 3);

  switch (randomlyPickedDifficulty) {
    case 0:
      return getRandomTerms(easyTermsData, numberOfTerms);
    case 1:
      return getRandomTerms(mediumTermsData, numberOfTerms);
    case 2:
      return getRandomTerms(hardTermsData, numberOfTerms);
    default:
      return getRandomTerms(easyTermsData, numberOfTerms);
  }
}


function getRandomTerms<T>(arr: T[], numberOfTerms: number): T[] {
  if (numberOfTerms > arr.length) {
    throw new Error("Number of terms cannot exceed the array length.");
  }

  const result = new Set<T>();
  while (result.size < numberOfTerms) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    result.add(arr[randomIndex]);
  }

  return Array.from(result);
}
