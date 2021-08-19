import type { AppProps } from 'next/app'
import {ThemeProvider} from "@material-ui/styles";
import overrideTheme from "@src/theme";
import {useEffect} from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={overrideTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
