"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import EditIcon from "@/app/components/icons/EditIcon";
import SmallProgressBar from "@/app/components/small-progress-bar/SmallProgressBar";
import SettingsTab from "@/app/components/settings-tab";
import HelpIcon from "@/app/components/icons/navbar-icons/HelpIcon";
import { useRouter } from "next/navigation";
import PolicyIcon from "@/app/components/icons/navbar-icons/PolicyIcon";
import SettingsToggleTab from "@/app/components/settings-toggle-tab";
import { getUserQuery, logoutUserMutation } from "@/app/services/queries/auth.query";
import { EDIT_PROFILE, LOGIN_URL } from "@/app/utilities/constants/global-urls";
import SelectDifficulty from "@/app/components/select-difficulty";
import LargePopup from "@/app/components/large-popup";
import ExitIcon from "@/app/components/icons/navbar-icons/ExitIcon";
import TrashIcon from "@/app/components/icons/TrashIcon";
import Popup from "@/app/components/popup";
import ButtonSecondary from "@/app/components/buttons/button-secondary/ButtonSecondary";
import ButtonStandard from "@/app/components/buttons/button-standard";


const profileData = {
  avatarURL: "/user-avatars/male-1.png",
  rang: "Student",
  rangURL: "/rangs/rang-1.png",
  username: "David Aslanyan",
  progress: 150,
  difficultyLevel: "easy"
};


enum PopupOption {
  signOut = "signOut",
  deleteAccount = "deleteAccount"
};


const Profile = () => {
  const router = useRouter();
  const { data: user, isLoading } = getUserQuery();
  const [difficultyPopupOpen, setDifficultyPopupOpen] = useState<boolean>(false);
  const [popup, setPopup] = useState<PopupOption | null>(null);

  const userMappedData = useMemo(() => {
    if (!user) return null;
    return {
      username: `${user.data.firstName} ${user.data.lastName}`,
      progress: user.data.progress, 
      difficultyLevel: user.data.difficultyLevel
    };
  }, [user]);

  const { mutate: logout } = logoutUserMutation();
  const handlePopupClick = () => {
    if (popup === PopupOption.signOut) {
      try {
        logout();
        router.replace(LOGIN_URL);
      } catch(error) {
        console.log("Failed to sign out", error);
      }
    }
    if (popup === PopupOption.deleteAccount) {
    }
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

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
          onClick={() => router.push(EDIT_PROFILE)}
        />

        <SettingsToggleTab 
          title="Notifications"
          icon={<EditIcon height={25} />}
          enabled={true}
          setEnabled={() => {}}
        />

      <SettingsTab
          title={`Selected Difficulty: ${userMappedData?.difficultyLevel}`}
          icon={<HelpIcon />}
          onClick={() => setDifficultyPopupOpen(true)}
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
          icon={<TrashIcon />}
          title="Delete Account"
          onClick={() => setPopup(PopupOption.deleteAccount)}
        />

        <SettingsTab
          icon={<ExitIcon />}
          title="Sign Out"
          onClick={() => setPopup(PopupOption.signOut)}
        />
      </section>


      <LargePopup isOpen={difficultyPopupOpen}>
        <SelectDifficulty 
          difficulty={userMappedData?.difficultyLevel}
          setDifficultyPopupOpen={setDifficultyPopupOpen}
        />
      </LargePopup>

      <Popup isOpen={popup !== null}>
        <div className="flex flex-col items-center justify-center">
          <p className="text-md text-secondary font-semibold">Are you sure you want to 
            {popup === PopupOption.deleteAccount ? " delete your account" : " sign out"}
            ?
          </p>

          <div className=" pt-10 flex items-center gap-5">
            <ButtonSecondary onClick={() => setPopup(null)} title="Cancel" />
            <ButtonStandard 
              onClick={handlePopupClick}
              title={popup === PopupOption.deleteAccount ? "Delete My Account" : "Sign Out"}
              />
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Profile;
