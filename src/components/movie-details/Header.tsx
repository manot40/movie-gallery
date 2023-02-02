import { memo } from 'react';
import Image from 'next/image';

import clsx from 'clsx';
import { assetUrl } from 'utils/assetUrl';
import { useBookmark } from 'store/reducer';
import { Badge, Button, Container } from 'components/reusable';
import { StarIcon, BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/solid';

type MovieHeaderProps = {
  data?: MovieDetail;
};

const Header: React.FC<MovieHeaderProps> = ({ data }) => {
  const { isBookmarked, add, remove } = useBookmark();

  const date = data && new Date(data.release_date);
  const bookmarked = data && isBookmarked(data.id);
  const Icon = bookmarked ? BookmarkSlashIcon : BookmarkIcon;
  const handleBookmark = (id: number) => (bookmarked ? remove(id) : add(id));

  return (
    <div className="font-display">
      {/* Header Background */}
      {data ? (
        <div
          className="header-hero bg-cover bg-center bg-no-repeat md:h-64 h-44"
          style={{ backgroundImage: "url('" + assetUrl(data.backdrop_path || '', 500) + "')" }}>
          <div className="md:backdrop-filter md:backdrop-blur-sm w-full h-full">
            <div className="w-full h-full opacity-50" style={{ backgroundColor: 'black' }} />
          </div>
        </div>
      ) : (
        <div className="header-hero bg-cover bg-center bg-gray-400 bg-no-repeat md:h-64 h-44 animate-pulse" />
      )}

      <Container className="mt-8">
        {/* Header content */}
        <div className="relative mb-12">
          <div className="md:flex md:space-x-8 px-4">
            <div className="-mt-40 md:-mt-52 flex md:block space-x-4 md:space-x-0 md:space-y-2">
              {data ? (
                <div className="flex items-start relative w-48 min-w-[8rem] h-48 md:h-72">
                  <Image
                    fill
                    sizes="100%"
                    className="rounded shadow-md"
                    alt={data.original_title || ''}
                    src={assetUrl(data.poster_path || '', 300)}
                  />
                </div>
              ) : (
                <div className="w-48 min-w-[8rem] h-48 md:h-72 bg-gray-300 animate-pulse" />
              )}
              <div className="grid grid-cols-3 gap-2 w-full items-start self-end">
                {data ? (
                  <>
                    <Button
                      className="col-span-2"
                      onClick={() => handleBookmark(data.id)}
                      colorScheme={bookmarked ? 'danger' : 'info'}>
                      <Icon className="h-5 w-5" />
                      &nbsp;&nbsp;{bookmarked ? 'Remove' : 'Bookmark'}
                    </Button>
                    <Button colorScheme="primary">
                      <StarIcon className="h-5 w-5" />
                    </Button>{' '}
                  </>
                ) : (
                  <>
                    <div className="col-span-2 bg-gray-300 animate-pulse w-full h-8" />
                    <div className="bg-gray-300 animate-pulse w-full h-8" />
                  </>
                )}
              </div>
            </div>
            <div className="inline-grid">
              <div className="md:-mt-48 mt-4 md:text-white space-y-2.5">
                <h1
                  className={clsx(
                    'text-3xl md:text-4xl font-bold',
                    !data && 'bg-gray-300 text-gray-300'
                  )}>
                  {data?.title || 'Lorem Ipsum Dolor Sit Amet'}{' '}
                  <span className="text-2xl text-gray-400">
                    {date && `(${date.getFullYear()})`}
                  </span>
                </h1>
                {data ? (
                  <div className="flex flex-wrap text-sm">
                    <strong>{data.status || 'Released'}</strong>
                    <b className="mx-1">-</b>
                    <p>{Intl.DateTimeFormat(undefined, { dateStyle: 'short' }).format(date)}</p>
                    <b className="mx-1">-</b>
                    <p>{minutesToHours(data.runtime || 120)}</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap text-sm animate-pulse w-52 h-6 bg-gray-300" />
                )}
                <div className="text-xs font-bold">
                  {data
                    ? data.genres.map((genre) => (
                        <Badge className="mr-1" key={genre.id}>
                          {genre.name}
                        </Badge>
                      ))
                    : null}
                </div>
              </div>
              <div className="mt-8 md:-mt-3 h-auto md:h-36">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p
                  className={clsx(
                    'text-sm max-w-full',
                    !data && 'w-full h-24 bg-gray-200 animate-pulse'
                  )}>
                  {data?.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const minutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export default memo(Header);
