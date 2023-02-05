import { useReducer, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useQueryMeta = <T = unknown>(initialState: T) => {
  const router = useRouter();
  const [isFirst, toggleFirst] = useState(false);

  const [query, setQuery] = useReducer(
    (state: T, newState: Partial<T>) => ({ ...state, ...newState }),
    initialState
  );

  useEffect(() => {
    if (router.isReady) {
      // @ts-ignore
      setQuery({ ...router.query });
      toggleFirst(true);
    }
  }, [router.isReady, router.query]);

  const updateQuery = (newState: Partial<T>) => {
    setQuery(newState);

    if (router.isReady)
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            ...newState,
          },
        },
        undefined,
        { shallow: true }
      );
  };

  return {
    query: isFirst ? query : null,
    updateQuery,
  };
};
