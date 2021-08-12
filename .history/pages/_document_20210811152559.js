import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCssString } from '../stiches.config'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
     
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssString() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

