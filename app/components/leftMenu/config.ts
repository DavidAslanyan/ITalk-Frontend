import { DASHBOARD_URL } from "@/app/utilities/constants/global-urls";

export const homeItem = {
  id: Math.random(),
  title: "Home",
  url: `${DASHBOARD_URL}`,
}

export const checkItemisActive = (pathname: string, url: string) => {
  if (pathname !== "/dashboard" && pathname.includes(url)) {
    return "text-primary";
  }
  return "text-white";
}

export const menuItemsTop = [
  {
    id: Math.random(),
    title: "Search",
    url: `${DASHBOARD_URL}/search`,
  },
  {
    id: Math.random(),
    title: "Games",
    url: `${DASHBOARD_URL}/games`,
  },
  {
    id: Math.random(),
    title: "Profile",
    url: `${DASHBOARD_URL}/profile`,
  }
];

export const menuItemsBottom = [
  {
    id: Math.random(),
    title: "Help",
    url: `${DASHBOARD_URL}/help`,
  },
  {
    id: Math.random(),
    title: "Policy",
    url: `${DASHBOARD_URL}/policy`,
  },
  {
    id: Math.random(),
    title: "Exit",
    url: `${DASHBOARD_URL}/exit`,
  },
];

