import React from 'react';
import type { AppProps } from 'next/app'
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import overrideTheme from "@src/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import '../styles/reset.css'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
      <ThemeProvider theme={overrideTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
  )
}

export default MyApp
