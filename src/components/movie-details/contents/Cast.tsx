import { memo, useMemo, useState } from 'react';

import clsx from 'clsx';
import useSWR from 'swr';
import { Heading } from '.';
import Image from 'next/image';
import { fetcher, assetUrl } from 'utils';
import { Result } from 'components/reusable';

const Cast: React.FC<{ id?: number }> = ({ id }) => {
  const { data: castRes, error } = useSWR<Res<Cast[]>>(`/movie/${id}/cast`, fetcher.get);

  const Content = useMemo(() => {
    if (!id) return Placeholder;

    if (error) return <Result.Error />;

    if (typeof castRes == 'undefined') return Placeholder;

    if (!castRes.data.length)
      return <Result.Info title="Empty Box" message="No cast found for this movie" />;

    return (
      <Wrapper>
        {castRes.data.map((cast) => (
          <CastCard key={cast.id} cast={cast} />
        ))}
      </Wrapper>
    );
  }, [id, castRes, error]);

  return (
    <div className="mb-8">
      <Heading noHr title="Main Cast" />
      {Content}
    </div>
  );
};

const CastCard: React.FC<{ cast?: Cast }> = ({ cast }) => {
  const FALL = '/placeholder/default_profile.jpg';
  const [img, setImg] = useState(assetUrl(cast?.profile_path || FALL, 200));
  return (
    <div className="flex flex-col space-y-2">
      <div
        className={clsx(
          'w-24 h-24 rounded-full overflow-hidden self-center relative',
          !cast && 'animate-pulse'
        )}>
        <Image
          fill
          src={img}
          sizes="100%"
          alt={cast?.name || ''}
          placeholder="blur"
          blurDataURL={FALL}
          onError={() => setImg(FALL)}
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-center space-y-1 max-w-[10rem]">
        <p
          className={clsx(
            'text-sm font-semibold',
            !cast && 'animate-pulse bg-gray-300 text-gray-300'
          )}>
          {cast?.name || 'Lorem Ipsum'}
        </p>
        <p
          className={clsx(
            'text-xs font-semibold text-neutral-400',
            !cast && 'animate-pulse bg-neutral-400'
          )}>
          {cast?.character || 'Sit amet Con'}
        </p>
      </div>
    </div>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-6 justify-start grid-flow-col max-w-full overflow-auto pt-6 pb-2">
    {children}
  </div>
);

const Placeholder = (
  <Wrapper>
    {Array(10)
      .fill(0)
      .map(() => (
        <CastCard key={Math.random()} />
      ))}
  </Wrapper>
);

export default memo(Cast);
