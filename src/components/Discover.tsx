import { useEffect, useMemo } from 'react';

import useSWR from 'swr';
import { fetcher, qsFormat } from 'utils';
import { useDebouncedState } from '@mantine/hooks';

import MovieList from './MovieList';
import { Input, Pagination, Result, Select } from './reusable';
import { useQueryMeta } from 'utils/hooks';

type MetaQuery = {
  page: number;
  search: string;
  genre?: string;
};

const Discover: React.FC<{ genre?: Genre[] }> = ({ genre = [] }) => {
  const { query, updateQuery } = useQueryMeta(META as MetaQuery);

  const [search, setSearch] = useDebouncedState<string | undefined>(undefined, 500);
  useEffect(() => {
    if (typeof search == 'undefined') return;
    updateQuery({ page: 1, search });
    // eslint-disable-next-line
  }, [search]);

  const { data: movieRes, error } = useSWR<Res<Movie[]>>(
    `/movie?${qsFormat(query || {})}`,
    fetcher.get
  );

  const pageCount = useMemo(() => {
    if (movieRes) return Math.ceil(movieRes.count / 20);
    return 0;
  }, [movieRes]);

  function handlePageChange(page: number) {
    const parent = document.querySelector('#discover');
    if (!parent) return;
    updateQuery({ page });
    window.scrollTo({ top: parent.clientTop - 20, behavior: 'smooth' });
  }

  if (error)
    return (
      <div className="py-24">
        <Result.Error />
      </div>
    );

  if (!query) return <div className="text-center">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="space-y-4 md:space-y-0 md:flex md:space-x-2">
        <Select
          label="Genre"
          labelKey="name"
          options={genre}
          className="min-w-[200px]"
          placeholder="Select Genre"
          value={query.genre}
          onChange={(e) => e && updateQuery({ genre: e as string })}
        />
        <Input
          label="Search Movie"
          className="w-full self-end"
          placeholder="Search by movie title"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid justify-items-center gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
        <MovieList data={movieRes?.data} skeleton={20} />
      </div>
      <Pagination page={+query.page} totalPages={pageCount} onPageChange={handlePageChange} />
      <br />
    </div>
  );
};

const META = {
  page: 1,
  search: '',
  genre: '0',
};

export default Discover;
