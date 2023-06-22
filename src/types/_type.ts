export type ConsertData = {
  _id: string;
  title: string;
  data: string;
  place: string;
  cast: Array<string>;
  image: string;
  grade: string;
  link: string;
};

export type RecentConsertData = {
  title: string;
  consertLink: string;
  image: string;
};

export type Rank = {
  _id: string;
  title: string;
  image: string;
};
