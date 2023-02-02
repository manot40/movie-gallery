import { memo } from 'react';

import { toast } from 'react-hot-toast';
import { useBookmark } from 'store/reducer';
import { BookmarkIcon } from '@heroicons/react/24/solid';

const BookmarkBadge: React.FC = () => {
  const { bookmark } = useBookmark();

  return (
    <div className="relative" onClick={() => toast.error('Not implemented yet')}>
      <div className="absolute -top-1 -right-1 bg-red-600 rounded-full px-1">
        <div className="flex justify-center items-center font-bold text-white text-[8px]">
          {bookmark.length}
        </div>
      </div>
      <BookmarkIcon className="w-5 h-5" />
    </div>
  );
};

export default memo(BookmarkBadge);
