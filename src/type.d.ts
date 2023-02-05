declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': {
      name: string;
      size?: string;
    } & React.HTMLAttributes<HTMLDivElement>;
  }
}

type Res<T> = {
  message: string;
  status: number;
  count: number;
  data: T;
};

type Genre = {
  id: string;
  name: string;
};

type Country = {
  name: string;
  iso_3166_1: string;
};

type Company = {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
};

type Cast = {
  id: number;
  name: string;
  adult: boolean;
  gender: number;
  character: string;
  profile_path: string;
};

type BaseMovie = {
  id: number;
  title: string;
  adult: boolean;
  video: boolean;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  original_title: string;
  original_language: string;
  vote_count: number;
  vote_average: number;
};

type TrailerVideo = {
  id: string;
  key: string;
  size: number;
  type: string;
};

type Bookmark = Pick<BaseMovie, 'id' | 'title' | 'poster_path'>;

type Movie = BaseMovie & {
  genre_ids: number[];
};

type MovieDetail = BaseMovie & {
  budget: number;
  status: string;
  genres: Genre[];
  imdb_id: string;
  runtime: number;
  revenue: number;
  tagline: string;
  homepage: string;
  trailer_video: TrailerVideo[];
  production_countries: Country[];
  production_companies: Company[];
};
