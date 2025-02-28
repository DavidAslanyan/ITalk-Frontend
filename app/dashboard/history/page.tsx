"use client";
import { TermType } from '@/app/utilities/types/term.type';
import easyTermsData from "../../data/easy-terms.json";
import mediumTermsData from "../../data/medium-terms.json";
import hardTermsData from "../../data/hard-terms.json";
import React, { useEffect, useState } from 'react'
import SearchBlock from '@/app/components/search-block';
import TermScrollable from '@/app/components/term-scrollable';
import SearchTermItem from '@/app/components/search-term-item';
import HistoryIcon from '@/app/components/icons/profile-icons/HistoryIcon';
import BookIcon from '@/app/components/icons/BookIcon';

const History = () => {
  const user = {
    progress: 5
  }

  const data = [...easyTermsData, ...mediumTermsData, ...hardTermsData];
  const [allTermsData] = useState<TermType[]>(data); 
  const [termsData, setTermsData] = useState<TermType[]>(data);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const filtered = allTermsData.filter((data) => 
      data.term.toLowerCase().includes(inputValue.toLowerCase()) ||
      inputValue.toLocaleLowerCase().includes(data.term.toLowerCase())
    );
    setTermsData(filtered);
  }, [inputValue, allTermsData]); 

  return (
    <div className='flex flex-col justify-between h-full'>
      <div className='pt-5 flex items-center gap-3 justify-center'>
        <BookIcon width={55} height={55} />
        <h1 className='text-secondary font-semibold text-xl'>History</h1>
      </div>

      <div className='pt-5 w-full max-w-[40rem] mx-auto flex flex-col justify-center items-center text-center'>
        <p className='text-base'>Number of terms learned: <span className='font-bold text-lg'>{user.progress}</span></p>
        <p>Here you can find all the terms you have leared so far. Consider this page as your library of what you alread know. In case you forget anything, no worries, we save everything here for you!</p>
      </div>

      <div className='flex flex-col items-center justify-center gap-10'>
        <div className='pt-2 md:pt-12 w-full max-w-[40rem] mx-auto'>
          <SearchBlock value={inputValue} setValue={setInputValue} variant='large' />
        </div>
      
        <section className='lg:ml-10 mb-10'>
          {termsData.length !== 0 
          ?
          <TermScrollable height='h-[65vh]'>
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
            <p className='text-md font-semibold text-secondary'>Term Not Found, maybe you haven't learned it yet !</p>
          </div>
          }

        </section>
      </div>
    </div>
  )
}

export default History;

