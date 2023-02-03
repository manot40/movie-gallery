import type { AppProps } from 'next/app';

import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from 'store';
import { BaseLayout, Head } from 'layouts';

import '../styles/globals.css';
import 'blaze-slider/dist/blaze.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Head />
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
