import { TermType } from '@/app/utilities/types/term.type';
import React from 'react'

type SearchTermItemProps = {
  term: TermType;
};

const SearchTermItem: React.FC<SearchTermItemProps> = ({ term }) => {
  return (
    <>
    <span className='text-lg font-bold'>
      {term.id}.{' '}
      {term.term}
      </span>
    <p className='text-md font-semibold'>{term.shortExplanation}</p>
    <p>{term.longExplanation}</p>
    <div className='my-4 h-[0.12rem] w-full bg-gray-300 rounded-full'></div>
    </>
  )
}

export default SearchTermItem;
