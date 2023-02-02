import type { AppProps } from 'next/app';
import Script from 'next/script';

import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from 'store';
import { BaseLayout } from 'layouts';

import '../styles/globals.css';
import 'blaze-slider/dist/blaze.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Movie Gallery</title>
      </Head>
      <Toaster />
      <ReduxProvider store={store}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default App;
