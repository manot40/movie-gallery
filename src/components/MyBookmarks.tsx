import { type FC, useMemo, useState } from 'react';

import MovieList from './MovieList';
import { Pagination } from './reusable';
import { useViewport } from 'utils/hooks';
import { useBookmark } from 'store/reducer';

const MyBookmarks: FC<{ genre?: Genre[] }> = ({ genre = [] }) => {
  const { lg } = useViewport();
  const { bookmark } = useBookmark();

  return null;
};

export default MyBookmarks;
