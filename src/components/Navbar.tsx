import { memo, useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { Container } from 'components/reusable';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import BookmarkBadge from './BookmarkBadge';

const Component = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  const Icon = theme === 'dark' ? MoonIcon : SunIcon;

  return (
    <header className="sticky z-20 w-full border-b backdrop-blur border-neutral-300 dark:border-neutral-600 -top-[3.9rem] md:-top-15">
      <div className="absolute flex -z-10 w-full h-full opacity-80 bg-white dark:bg-black" />
      <Container className="flex items-center justify-between w-auto py-4">
        <Link passHref href="/">
          <div className="inline-flex text-xl cursor-pointer">
            <h1 className="tracking-wide font-extrabold select-none">MOVIE</h1>
            &nbsp;
            <p className="tracking-wider select-none">GALLERY</p>
          </div>
        </Link>
        <div className="flex space-x-4 cursor-pointer select-none hover:text-black dark:hover:text-white">
          <BookmarkBadge />
          {mounted && <Icon onClick={toggleTheme} className="w-5 h-5" />}
        </div>
      </Container>
    </header>
  );
};

const Navbar = memo(Component);

export default Navbar;
