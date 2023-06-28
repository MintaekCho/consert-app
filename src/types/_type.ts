export type ConcertData = {
  _id: string;
  title: string;
  date: string;
  place: string;
  cast: Array<string>;
  image: string;
  grade: string;
  link: string;
};

export interface UserData {
  email: string;
  name: string;
  profile: string;
  bookMarks: Array<ArtistData>;
}

export type SessionUser =
  | {
      email: string;
      name: string;
      image: string;
    }
  | undefined;

export type RecentConsertData = {
  title: string;
  consertLink: string;
  image: string;
  place: string;
};

export type Rank = {
  _id: string;
  title: string;
  image: string;
  place: string;
};

export type ProceedingConsertData = {
  _id: string;
  title: string;
  date: string;
  place: string;
  cast: Array<string>;
  image: string;
  grade: string;
  link: string;
};

export type ArtistAlbumData = {
  _id: string;
  artistName: string;
  albums: Array<AlbumData>;
};

export type AlbumData = {
  title: string;
  titleSong: string;
  vdoName: string;
  releaseDate: string;
  songCount: string;
  albumImage: string;
  likeCount: string;
};

export type ArtistData = {
  _id: string;
  profile: string;
  recentConserts: RecentConsertData[];
  korName: string;
  enName: string;
  bookmark: string[];
};

export type Thumbnails = {
  height: number;
  url: string;
  width: number;
};

export type YoutubeData = {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    thumbnails: {
      default: Thumbnails;
      high: Thumbnails;
      medium: Thumbnails;
    };
    title: string;
  };
};

export type CommentData = {
  _id: string;
  artistId: string;
  writer: SessionUser | undefined;
  content: string;
  createdAt: string;
  updatedAt: string;
  isUpdated: boolean;
};

export interface SearchProps {
  keyword: string | null;
}
