import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector } from 'store';

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    bookmark: [] as number[],
  },
  reducers: {
    addBookmark: (state, action: PayloadAction<number>) => {
      state.bookmark.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      state.bookmark = state.bookmark.filter((item) => item !== action.payload);
    },
  },
});

const { addBookmark, removeBookmark } = bookmarkSlice.actions;

export const useBookmarkDispatch = () => {
  const dispatch = useAppDispatch();

  const add = (id: number) => dispatch(addBookmark(id));
  const remove = (id: number) => dispatch(removeBookmark(id));

  return { add, remove };
};

export const useBookmark = () => {
  const dispatcher = useBookmarkDispatch();
  const { bookmark } = useTypedSelector((state) => state.bookmarkReducer);

  const find = (id: number) => bookmark.find((_id) => _id === id);
  const isBookmarked = (id: number) => !!find(id);

  return { bookmark, find, isBookmarked, ...dispatcher };
};

export default bookmarkSlice.reducer;
