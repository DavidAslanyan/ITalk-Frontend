"use client";
import React, { useEffect, useState } from 'react';
import easyTermsData from "../../data/easy-terms.json";
import mediumTermsData from "../../data/medium-terms.json";
import hardTermsData from "../../data/hard-terms.json";
import { TermType } from '@/app/utilities/types/term.type';
import SearchTermItem from '@/app/components/search-term-item';
import TermScrollable from '@/app/components/term-scrollable';
import SearchBlock from '@/app/components/search-block';
import { useSearchParams } from 'next/navigation'


const Search = () => {
  const searchParams = useSearchParams();
  const term = searchParams.get('term');

  console.log("Terms: ", term)

  const data = [...easyTermsData, ...mediumTermsData, ...hardTermsData];
  const [allTermsData] = useState<TermType[]>(data); 
  const [termsData, setTermsData] = useState<TermType[]>(data);
  const [inputValue, setInputValue] = useState<string>("");
  
  useEffect(() => {
    const filtered = allTermsData.filter((data) => 
      data.term.toLowerCase().includes(inputValue.toLowerCase()) ||
      inputValue.toLocaleLowerCase().includes(data.term.toLowerCase()) ||
      data.shortExplanation.toLowerCase().includes(inputValue.toLowerCase()) ||
      data.longExplanation.toLowerCase().includes(inputValue.toLowerCase())
    );
    setTermsData(filtered);
  }, [inputValue, allTermsData]); 
  
  return (
    <div className='flex flex-col items-center  h-full'>
      <div className='pt-2 md:pt-12 py-3 w-full max-w-[30rem] mx-auto'>
        <SearchBlock value={inputValue} setValue={setInputValue} variant='large' />
      </div>
     
      <section className='lg:ml-10 mb-10'>
        {termsData.length !== 0 
        ?
        <TermScrollable>
          <ul>
            {termsData.map((term) => (
              <li className='text-secondary' key={term.id}>
                <SearchTermItem term={term} />
              </li>
            ))}
          </ul>
        </TermScrollable>
        :
        <div className='h-[65vh]'>
          <p className='text-md font-semibold text-secondary'>Term Not Found</p>
        </div>
        }
      </section>
    </div>
  )
}

export default Search;

