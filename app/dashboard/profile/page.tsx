"use client";
import React, { useState } from "react";
import Image from "next/image";
import EditIcon from "@/app/components/icons/EditIcon";
import SmallProgressBar from "@/app/components/small-progress-bar/SmallProgressBar";
import SettingsTab from "@/app/components/settings-tab";
import HelpIcon from "@/app/components/icons/navbar-icons/HelpIcon";
import { useRouter } from "next/navigation";
import PolicyIcon from "@/app/components/icons/navbar-icons/PolicyIcon";
import SettingsToggleTab from "@/app/components/settings-toggle-tab";


const profileData = {
  avatarURL: "/user-avatars/male-1.png",
  rang: "Student",
  rangURL: "/rangs/rang-1.png",
  username: "David Aslanyan",
  progress: 150,
};

{/* <div className="w-[12rem] border-[1rem] border-thirdly rounded-full">
            <Image
              width={200}
              height={200}
              src={profileData.avatarURL}
              alt="prfile avatar"
            />
          </div> */}

          // <h3 className="text-3xl text-secondary font-bold">
          //   {profileData.username}
          // </h3>
          // <EditIcon />

const Profile = () => {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-[150vh] sm:min-h-[120vh] md:min-h-[100vh]">

      <section className="flex max-w-[40rem] justify-between items-center">
        <div>
          <div className="w-[12rem] border-[1rem] border-thirdly rounded-full">
            <Image
              width={200}
              height={200}
              src={profileData.avatarURL}
              alt="prfile avatar"
            />
          </div>

          <div className="flex items-center gap-2">
            <h3 className="text-xl sm:text-3xl text-secondary font-bold">
              {profileData.username}
            </h3>
            <EditIcon />
          </div>
        </div>

        <div className="">
          <Image
            width={100}
            height={100}
            src={profileData.rangURL}
            alt="rang"
          />
          <h3 className="text-lg font-bold">{profileData.rang}</h3>
        </div>
      </section>

      <section className="pt-10">
        <span>Current Progress: {profileData.progress}</span>
        <SmallProgressBar progress={profileData.progress} />
      </section>

      <section className="flex flex-col gap-3 pt-10">
        <SettingsTab
          title="Edit Profile"
          icon={<EditIcon height={25} />}
          onClick={() => router.push("help")}
        />

        <SettingsToggleTab 
          title="Dark Mode"
          icon={<EditIcon height={25} />}
          enabled={darkMode}
          setEnabled={setDarkMode}
        />

        <SettingsToggleTab 
          title="Notifications"
          icon={<EditIcon height={25} />}
          enabled={darkMode}
          setEnabled={setDarkMode}
        />

      <SettingsTab
          title="Selected Difficulty: Easy"
          icon={<HelpIcon />}
          onClick={() => router.push("help")}
        />


        <div className='my-4 h-[0.12rem] max-w-[40rem] bg-gray-300 rounded-full'></div>

        <SettingsTab
          title="Help Center"
          icon={<HelpIcon />}
          onClick={() => router.push("help")}
        />

        <SettingsTab
          title="About"
          icon={<HelpIcon />}
          onClick={() => router.push("help")}
        />

        <SettingsTab
          title="Policies"
          icon={<PolicyIcon />}
          onClick={() => router.push("help")}
        />

        <SettingsTab
          title="Delete Account"
          onClick={() => router.push("help")}
        />
      </section>
    </div>
  );
};

export default Profile;
