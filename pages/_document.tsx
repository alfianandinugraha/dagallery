import Document, {DocumentContext, Head, Html, Main, NextScript} from "next/document";
import {ServerStyleSheets} from "@material-ui/styles";
import {AppType} from "next/dist/shared/lib/utils";

class RootDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () => {
      return originalRenderPage({
        enhanceApp: (App: AppType) => {
          return (props) => {
            return sheets.collect(<App {...props}/>)
          }
        }
      })
    }

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [sheets.getStyleElement()]
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                rel="stylesheet"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default RootDocument