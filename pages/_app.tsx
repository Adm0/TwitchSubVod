import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalProvider } from '@/stores/GlobalContext';
import { darkTheme, lightTheme } from '@/components/themes';
import GlobalStyle from '@/styles/GlobalStyle';
import * as gtag from '../utils/gtag';
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('@pogu: theme');

      if (savedTheme) {
        return savedTheme;
      }
      return 'dark';
    }
  });

  useEffect(() => {
    localStorage.setItem('@pogu: theme', theme);

    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [theme, router.events]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const kofiLink = document.querySelectorAll<HTMLAnchorElement>(
        '.kfds-text-is-link-dark',
      );
      kofiLink.forEach((el) => {
        el.rel = 'noopener noreferrer';
      });
    }
  }, []);

  const themeSwitcher = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Twitch Sub Vod</title>
      </Head>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <button
          style={{
            position: 'absolute',
            margin: 8,
            backgroundColor: '#000',
            color: '#FFF',
            borderRadius: '15px',
            fontSize: 16,
            padding: '6px 8px',
          }}
          onClick={themeSwitcher}
        >
          🌞 🌜
        </button>
        <GlobalStyle />
        <GlobalProvider>
          <a
            href="https://pogu.live?ref=old.pogu.live"
            style={{
              backgroundColor: '#A70050',
              height: 'fit-content',
              width: '100vw',
              position: 'fixed',
              bottom: 0,
              left: -18,
              right: 0,
              padding: '16px 8px',
              textAlign: 'center',
              margin: '0 20px',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#FFF',
              gap: '16px',
            }}
          >
            <img src="https://pogu.live/favicon-white.png" width="48px" />
            Join the open beta now <br />
            (pogu.live)
          </a>
          <Component {...pageProps} />
        </GlobalProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
