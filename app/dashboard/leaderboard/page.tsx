"use client";
import GobletIcon from '@/app/components/icons/GobletIcon';
import Loading from '@/app/components/loading';
import TermScrollable from '@/app/components/term-scrollable';
import UserTableRow from '@/app/components/user-table-row';
import { getUsersListQuery } from '@/app/services/queries/auth.query';
import React from 'react'

// const dataMock = [
//   {
//     username: "David Aslanawdawdyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "hard",
//     progress: 50
//   },
//   {
//     username: "David Aslanyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "medium",
//     progress: 50
//   },
//   {
//     username: "David Aslanawdawdyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "hard",
//     progress: 50
//   },
//   {
//     username: "David Aslanyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "medium",
//     progress: 50
//   },
//   {
//     username: "David Aslanawdawdyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "hard",
//     progress: 50
//   },
//   {
//     username: "David Aslanyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "medium",
//     progress: 50
//   },
//   {
//     username: "David Aslanawdawdyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "hard",
//     progress: 50
//   },
//   {
//     username: "David Aslanyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "medium",
//     progress: 50
//   },
//   {
//     username: "David Aslanawdawdyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "hard",
//     progress: 50
//   },
//   {
//     username: "David Aslanyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "medium",
//     progress: 50
//   },
//   {
//     username: "David Aslanawdawdyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "hard",
//     progress: 50
//   },
//   {
//     username: "David Aslanyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "medium",
//     progress: 50
//   },
//   {
//     username: "David Aslanawdawdyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "hard",
//     progress: 50
//   },
//   {
//     username: "David Aslanyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "medium",
//     progress: 50
//   },
//   {
//     username: "David Aslanawdawdyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "hard",
//     progress: 50
//   },
//   {
//     username: "David Aslanyan",
//     avatar: "/user-avatars/male-1.png",
//     frame: "def",
//     email: "david@gmail.com",
//     points: 2000,
//     difficulyLevel: "medium",
//     progress: 50
//   }
  
// ];

const Leaderboard = () => {
  const { data: usersList, isLoading } = getUsersListQuery();

  if (isLoading) {
    <Loading />
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <section className='pt-10 md:pt-0 flex items-center justify-center gap-3'>
        <div className='hidden md:block'>
          <GobletIcon width={120} height={120} />
        </div>
        <h1 className='text-4xl text-secondary font-semibold'>Leaderboard</h1>
        <div className='hidden md:block'>
          <GobletIcon width={120} height={120} />
        </div>
      </section>
      
      <section className='pb-5 text-md text-secondary font-medium text-center w-full max-w-[40rem]'>
        <p>This is where the best of the best shine! Check out the rankings, see how you stack up against other players, and track everyone's progress. Can you spot yourself on the list? Keep climbing and claim your spot at the top!.</p>
      </section>

      <div className='w-full max-w-[60rem] mx-auto'>
        <TermScrollable height='h-[70vh]'>
          <ul className='flex flex-col gap-5'>
            {usersList?.data?.map((item: any, index: number) => (
              <li key={index}>
                <UserTableRow data={item} id={index + 1} />
              </li>
            ))}
          </ul>
        </TermScrollable>
      </div>
    </div>
  )
}

export default Leaderboard;

