"use client";
import React, { useState } from "react";
import Image from "next/image";
import EditIcon from "@/app/components/icons/EditIcon";
import SettingsTab from "@/app/components/settings-tab";
import HelpIcon from "@/app/components/icons/navbar-icons/HelpIcon";
import { useRouter } from "next/navigation";
import PolicyIcon from "@/app/components/icons/navbar-icons/PolicyIcon";
import SettingsToggleTab from "@/app/components/settings-toggle-tab";
import { deleteUserMutation, logoutUserMutation } from "@/app/services/queries/auth.query";
import { EDIT_PROFILE, LEADERBOARD_URL, LOGIN_URL, REGISER_URL } from "@/app/utilities/constants/global-urls";
import SelectDifficulty from "@/app/components/select-difficulty";
import LargePopup from "@/app/components/large-popup";
import ExitIcon from "@/app/components/icons/navbar-icons/ExitIcon";
import TrashIcon from "@/app/components/icons/TrashIcon";
import Popup from "@/app/components/popup";
import ButtonSecondary from "@/app/components/buttons/button-secondary/ButtonSecondary";
import ButtonStandard from "@/app/components/buttons/button-standard";
import { determinePrize } from "@/app/utilities/functions/map-prizes";
import BackgroundContainer from "@/app/components/background-container";
import AvatarFrame from "@/app/components/avatar-frame";
import ProgressIcon from "@/app/components/icons/ProgressIcon";
import BellIcon from "@/app/components/icons/BellIcon";
import BookIcon from "@/app/components/icons/BookIcon";
import Loading from "@/app/components/loading";
import FailIcon from "@/app/components/icons/FailIcon";
import { COLORS } from "@/app/utilities/constants/colors";
import PrizeIcon from "@/app/components/icons/PrizeIcon";
import useGetUser from "@/app/utilities/hooks/useGetUser";


enum PopupOption {
  signOut = "signOut",
  deleteAccount = "deleteAccount"
};


const Profile = () => {
  const router = useRouter();
  const { user, isLoading } = useGetUser();
  const { mutate: logout } = logoutUserMutation();
  const { mutate: deleteUser } = deleteUserMutation();

  const [difficultyPopupOpen, setDifficultyPopupOpen] = useState<boolean>(false);
  const [popup, setPopup] = useState<PopupOption | null>(null);
  const [notificationsActive, setNotificationsActive] = useState<boolean>(false);


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
      try {
        deleteUser();
        router.replace(REGISER_URL);
      } catch(error) {
        console.log("Failed to delete user", error);
      }
    }
  }

  if (isLoading || !user) {
    return <Loading />;  
  }

  const { current } = determinePrize(user.points);

  return (
    <div className="flex flex-col py-10 min-h-[150vh] sm:min-h-[120vh] md:min-h-[100vh] w-full max-w-[50rem] mx-auto rounded-md">
      <div className="shadow-md rounded-md">
        <section>
          <div className="z-0">
            <BackgroundContainer imageUrl={user.background} />
          </div>
          
          <div className="z-20 relative bottom-[7rem] md:bottom-8 flex flex-col items-center justify-center">
            <AvatarFrame type={user.frame}>
              <Image
                priority
                width={200}
                height={200}
                src={user?.avatar}
                alt="profile avatar"
              />
            </AvatarFrame>

            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-3xl text-secondary font-bold">
                {user?.firstName} {user?.lastName}
              </h3>
              <button onClick={() => router.push(EDIT_PROFILE)}>
                <EditIcon />
              </button>
            </div>

            <div className="flex items-center">
              <p className="text-md text-primary font-bold">{current.title}</p>
              <div>{current.icon}</div>
            </div>

            <div className="flex items-center gap-5 ">
              <p>XP Points: <span className="text-md font-bold text-secondary">{user?.points}</span></p>
              <div className="bg-thirdly w-[0.1rem] h-5"></div>
              <div className="flex items-center gap-2">
                <ProgressIcon width={22} height={22} />
                <p>Progress: <span className="text-md font-bold text-secondary">{user?.progress}</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 justify-center items-center px-4 pb-10">
          <SettingsTab
            title="Edit Profile"
            icon={<EditIcon height={25} />}
            onClick={() => router.push(EDIT_PROFILE)}
          />

          <SettingsTab
            title="History"
            icon={<BookIcon />}
            onClick={() => router.push(EDIT_PROFILE)}
          />

          <SettingsTab
            title="Leaderboard"
            icon={<PrizeIcon />}
            onClick={() => router.push(LEADERBOARD_URL)}
          />

          <SettingsToggleTab 
            title="Notifications"
            icon={<BellIcon />}
            enabled={notificationsActive}
            setEnabled={setNotificationsActive}
          />

          <SettingsTab
            title={`Selected Difficulty: ${user.difficultyLevel}`}
            onClick={() => setDifficultyPopupOpen(true)}
          />

          <div className='my-4 h-[0.12rem] w-full max-w-[40rem] bg-thirdly rounded-full'></div>

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
      </div>


      <LargePopup isOpen={difficultyPopupOpen}>
        <SelectDifficulty 
          difficulty={user.difficultyLevel}
          setDifficultyPopupOpen={setDifficultyPopupOpen}
        />
      </LargePopup>

      <Popup isOpen={popup !== null}>
        <div className="flex flex-col items-center justify-center">
          {popup === PopupOption.deleteAccount 
          ? <FailIcon width={120} height={120} color={COLORS.primaryRed} /> 
          : <ExitIcon width={120} height={120} />
          }
          <p className="pt-5 text-md text-secondary font-semibold">Are you sure you want to 
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
