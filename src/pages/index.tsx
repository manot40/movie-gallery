import type { NextPage } from 'next';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from 'utils';
import { VideoCameraIcon } from '@heroicons/react/24/solid';
import { Container, Section } from 'components/reusable';

import Discover from 'components/Discover';

const Home: NextPage = () => {
  const { data: res } = useSWR<Res<Genre[]>>('/genre', fetcher.get);

  const genre = useMemo(() => (res ? [{ id: '0', name: 'All Genres' }, ...res.data] : []), [res]);

  return (
    <Container className="mt-8 space-y-12">
      <Section id="discover" title="Discover Movies" icon={<VideoCameraIcon className="w-9 h-9" />}>
        <Discover genre={genre} />
      </Section>
    </Container>
  );
};

export default Home;
