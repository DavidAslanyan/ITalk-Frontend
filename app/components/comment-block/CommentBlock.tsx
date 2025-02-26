"use client"
import React from 'react'

type CommentBlockProps = {
  comment: string;
}

const insertSounds = (str: string): string => {
  if (!str) return "";
  const insertAtRandom = (text: string, insert: string): string => {
    const index = Math.floor(Math.random() * (text.length + 1)); 
    return text.slice(0, index) + insert + text.slice(index);
  };

  let modifiedStr = str;
  const insertions = Math.floor(Math.random() * 3) + 1; 

  for (let i = 0; i < insertions; i++) {
    modifiedStr = insertAtRandom(modifiedStr, "aaarrrrrr");
  }

  return modifiedStr;
};

const CommentBlock: React.FC<CommentBlockProps> = ({ comment }) => {
  return (
    <div className='relative w-full max-w-[20rem] border-2 border-thirdly rounded-md py-2 px-3'>
      <p className='px-4'>{insertSounds(comment)}</p>
      <div className='z-10 absolute -right-5 -bottom-4 bg-backPrimary border-2 border-thirdly w-8 h-8 rounded-full'></div>
    </div>
  )
}

export default CommentBlock;

