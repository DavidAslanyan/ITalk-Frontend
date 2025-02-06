import { DASHBOARD_URL } from "@/app/utilities/constants/global-urls";
import SearchIcon from "../icons/navbar-icons/SearchIcon";
import GameIcon from "../icons/navbar-icons/GameIcon";
import ProfileIcon from "../icons/navbar-icons/ProfileIcon";
import HelpIcon from "../icons/navbar-icons/HelpIcon";
import PolicyIcon from "../icons/navbar-icons/PolicyIcon";
import ExitIcon from "../icons/navbar-icons/ExitIcon";


export const homeItem = {
  id: Math.random(),
  title: "Home",
  url: `${DASHBOARD_URL}`,
}

export const menuItemsTop = [
  {
    id: Math.random(),
    title: "Search",
    url: `${DASHBOARD_URL}/search`,
    icon: <SearchIcon />
  },
  {
    id: Math.random(),
    title: "Games",
    url: `${DASHBOARD_URL}/games`,
    icon: <GameIcon />
  },
  {
    id: Math.random(),
    title: "Profile",
    url: `${DASHBOARD_URL}/profile`,
    icon: <ProfileIcon  height={25} />
  }
];

export const menuItemsBottom = [
  {
    id: Math.random(),
    title: "Help",
    url: `${DASHBOARD_URL}/help`,
    icon: <HelpIcon />
  },
  {
    id: Math.random(),
    title: "Policy",
    url: `${DASHBOARD_URL}/policy`,
    icon: <PolicyIcon />
  },
  {
    id: Math.random(),
    title: "Exit",
    url: `${DASHBOARD_URL}/exit`,
    icon: <ExitIcon />
  },
];

