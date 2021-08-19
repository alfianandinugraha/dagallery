import type { AppProps } from 'next/app'
import {ThemeProvider} from "@material-ui/styles";
import overrideTheme from "@src/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={overrideTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
