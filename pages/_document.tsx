import React from "react";
import Document, {DocumentContext, Head, Html, Main, NextScript} from "next/document";
import {ServerStyleSheets} from "@material-ui/core/styles";
import {AppType} from "next/dist/next-server/lib/utils";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                rel="stylesheet"/>
          <title>Dagallery</title>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: AppType) => (props) => sheets.collect(<App {...props}/>)
    })

  const initialProps = await Document.getInitialProps(ctx)
  return {
    ...initialProps,
    styles: (
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    )
  }
}
