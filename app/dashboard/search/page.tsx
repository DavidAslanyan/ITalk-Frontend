"use client";
import React, { useState } from 'react';
import easyTermsData from "../../data/easy-terms.json";
import { TermType } from '@/app/utilities/types/term.type';
import SearchTermItem from '@/app/components/searchTermItem';
import TermScrollable from '@/app/components/termScrollable';
import SearchBlock from '@/app/components/searchBlock';


const Search = () => {
  const [termsData, setTermsData] = useState<TermType[]>(easyTermsData);
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className='flex flex-col justify-between h-full'>
      <div className='pt-10'>
        <SearchBlock value={searchInput} setValue={setSearchInput} />
      </div>
     
      <section className='lg:ml-10 mb-10'>
        <TermScrollable>
          <ul>
            {termsData.map((term) => (
              <li className='text-secondary' key={term.id}>
                <SearchTermItem term={term} />
              </li>
            ))}
          </ul>
        </TermScrollable>
      </section>
    </div>
  )
}

export default Search;

