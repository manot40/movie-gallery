import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { trimString, assetUrl } from 'utils';
import { Button, NotFound } from './reusable';
import { useBookmark, useBookmarkDispatcher } from 'store/reducer';

import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/solid';

type MovieListProps = {
  data?: Movie[];
  skeleton: number;
  onFocus?: (id: number) => void;
};

type MovieCardProps = React.HTMLAttributes<HTMLDivElement> & {
  priority?: boolean;
  data: Pick<Movie, 'title' | 'id' | 'poster_path'>;
};

const MovieList = ({ data, skeleton = 20 }: MovieListProps) => {
  const { find, isBookmarked } = useBookmark();
  const { add, remove } = useBookmarkDispatcher();

  function handleFocus() {}

  function handleBookmark(e: React.MouseEvent, movie: Movie) {
    e.preventDefault();
    if (find(movie.id)) {
      remove(movie.id);
      toast.success(`${movie.title} removed from bookmarks`);
    } else {
      add(movie.id);
      toast.success(`${movie.title} added to bookmarks`);
    }
  }

  if (!data) return <MovieList.Skeleton count={skeleton} />;

  if (!data.length)
    return (
      <div className="flex col-span-full row-span-6 items-center">
        <NotFound />
      </div>
    );

  return (
    <>
      {data.map((movie) => {
        const isBook = isBookmarked(movie.id);
        const Icon = isBook ? BookmarkSlashIcon : BookmarkIcon;
        return (
          <MovieList.Card key={movie.id} data={movie} priority onClick={handleFocus}>
            <Button
              className="absolute p-2 right-1 bottom-1 z-10 opacity-50 hover:opacity-100"
              onClick={(e) => handleBookmark(e, movie)}
              colorScheme={isBook ? 'danger' : 'info'}
              shadow={isBook}>
              <Icon className="w-4 h-4" />
            </Button>
          </MovieList.Card>
        );
      })}
    </>
  );
};

MovieList.Card = function Card({ data, children, priority, ...restProps }: MovieCardProps) {
  if (!data?.id) return null;
  return (
    <div className="font-sans w-36">
      <Link href={`/movie/${data.id}`}>
        <div
          {...restProps}
          className={
            'flex items-start relative mb-2 w-full h-56 dark:shadow-neutral-600 hover:scale-105 hover:shadow-2xl transition-all duration-300 ' +
            restProps.className
          }>
          <Image
            fill
            sizes="100%"
            alt={data.title}
            priority={priority}
            className="rounded shadow-md"
            src={assetUrl(data.poster_path, 300)}
          />
          {children}
        </div>
      </Link>
      <div className="cursor-pointer hover:underline" onClick={() => {}}>
        <Link href={`/movie/${data.id}`} className="flex flex-col flex-1 flex-grow text-left">
          <div className="line-clamp-2 font-medium min-h-4 text-sm">{data.title}</div>
        </Link>
      </div>
    </div>
  );
};

MovieList.Skeleton = function Skeleton({ count }: { count: number }) {
  return (
    <>
      {Array(count)
        .fill(1)
        .map((_, i) => (
          <div key={i} className="animate-pulse font-sans">
            <div className="flex items-start relative w-full mb-2 min-w-[8.99rem] max-w-[8.99rem] h-[13.5rem]">
              <div className="rounded shadow-md w-[143px] h-[216px] bg-neutral-300 dark:bg-neutral-600" />
            </div>
            <div className="min-h-[2.5rem]">
              <div className="mt-2 w-[130px] h-[20px] bg-neutral-300 dark:bg-neutral-600" />
            </div>
          </div>
        ))}
    </>
  );
};

export default MovieList;
