import NextHead from 'next/head';

export function Head({ children }: { children?: React.ReactNode }) {
  return (
    <NextHead>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <title>Movie Gallery</title>
      {children}
    </NextHead>
  );
}
