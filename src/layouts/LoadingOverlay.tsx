import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LoadingOverlay = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };

    const handleComplete = (url: string) => {
      if (url !== router.asPath || router.isReady) {
        setLoading(false);
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeError', handleComplete);
    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeError', handleComplete);
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);

  return loading ? (
    <div className="fixed z-[999] top-0 left-0 w-screen">
      <LoadingLine />
      <div className="absolute right-5 my-1.5 loader w-4 h-4" />
    </div>
  ) : null;
};

const LoadingLine = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setWidth((w) => (w < 95 ? w + 1 : w)),
      width < 30 ? 50 : 150
    );

    return () => clearInterval(interval);
  }, [width]);

  return (
    <div
      className="h-1 bg-neutral-800 dark:bg-neutral-200 transition-all duration-300"
      style={{ width: `${width}%` }}
    />
  );
};

export default LoadingOverlay;
