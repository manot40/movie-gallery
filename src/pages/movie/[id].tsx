import type { NextPage } from 'next';

import useSWR from 'swr';
import Head from 'next/head';
import { fetcher } from 'utils';
import { useRouter } from 'next/router';

import MovieDetailsHeader from 'components/movie-details/Header';
import MovieDetailsContent from 'components/movie-details/Content';
import { Result } from 'components/reusable';

const Movie: NextPage = () => {
  const { query } = useRouter();
  const { data: res, error } = useSWR<Res<MovieDetail>>(`/movie/${query.id}`, fetcher.get);

  if (error)
    return (
      <div className="py-24">
        <Result.Error />
      </div>
    );

  return (
    <>
      <Head>{res && <title>{res.data.title} | Movie Gallery</title>}</Head>

      <MovieDetailsHeader data={res?.data} />

      <MovieDetailsContent data={res?.data} />
    </>
  );
};

export default Movie;
