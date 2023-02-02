import { memo } from 'react';

import { Heading } from '.';

const Trailer: React.FC<{ data?: TrailerVideo[] }> = ({ data }) => {
  if (data && !data.length) return null;

  return (
    <div className="mb-8">
      <Heading noHr title="Trailer Video" />
      <br />
      <div className="relative h-0 pb-[56.25%] flex justify-center items-baseline w-full">
        {data ? (
          <iframe
            width="560"
            height="315"
            allowFullScreen
            title="YouTube video player"
            src={`https://www.youtube.com/embed/${data[0].key}`}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="absolute left-0 top-0 animate-pulse bg-gray-300 w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default memo(Trailer);
