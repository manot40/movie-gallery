import { memo, useMemo } from 'react';

import useSWR from 'swr';
import { Heading } from '.';
import { fetcher } from 'utils';

import MovieList from 'components/MovieList';
import { Result } from 'components/reusable';
import { CubeTransparentIcon } from '@heroicons/react/24/solid';

const Recommendation: React.FC<{ id?: number }> = ({ id }) => {
  const { data: movieRes, error } = useSWR<Res<Movie[]>>(
    `/movie/${id}/recommendations`,
    fetcher.get
  );

  const Content = useMemo(() => {
    if (!id) return Placeholder;

    if (error) return <Result.Error />;

    if (!movieRes) return Placeholder;

    if (!movieRes.data.length)
      return (
        <Result.Info
          title="Empty Box"
          message="No recommendation found for this movie"
          icon={<CubeTransparentIcon className="h-20 w-20" />}
        />
      );

    return (
      <Wrapper>
        {movieRes.data.map((movie) => (
          <MovieList.Card key={movie.id} data={movie} />
        ))}
      </Wrapper>
    );
  }, [id, error, movieRes]);

  return (
    <div>
      <Heading noHr title="You May Also Like" />
      {Content}
    </div>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-6 justify-start grid-flow-col max-w-full overflow-auto py-6">
    {children}
  </div>
);

const Placeholder = (
  <Wrapper>
    <MovieList.Skeleton count={10} />
  </Wrapper>
);

export default memo(Recommendation);
