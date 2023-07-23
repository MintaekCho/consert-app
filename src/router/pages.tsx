import { BiCalendarHeart } from "react-icons/bi";

export interface pageInfo {
  id: string;
  label: string;
  href: string;
  withAuth: boolean;
}

export const pageList: pageInfo[] = [
  {
    id: "artist",
    label: "Artist",
    href: "/artist",
    withAuth: false,
  },
  {
    id: "concert",
    label: "Concert",
    href: "/consert",
    withAuth: false,
  },
  {
    id: "schedule",
    label: "Schedule",
    href: "/schedule",
    withAuth: false,
  },
  {
    id: "community",
    label: "Community",
    href: "/community",
    withAuth: false,
  },
];
