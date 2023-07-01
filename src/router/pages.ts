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
];
