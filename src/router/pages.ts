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
    id: "consert",
    label: "Consert",
    href: "/consert",
    withAuth: false,
  },
];
