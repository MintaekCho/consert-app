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
}

export type ArtistAlbumData = {
    _id: string
    artistName: string;
    albums: Array<AlbumData>
}

export type AlbumData = {
    title: string;
    titleSong: string;
    vdoName: string;
    releaseDate: string;
    songCount: string;
    albumImage: string;
    likeCount: string;
}
