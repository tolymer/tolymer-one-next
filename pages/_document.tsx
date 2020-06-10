import { Global, css } from "@emotion/core";
import Document, { Html, Head, Main, NextScript } from "next/document";

const globalStyle = css`
  /* vietnamese */
  @font-face {
    font-family: "Asap";
    font-style: normal;
    font-weight: 400;
    src: local("Asap Regular"), local("Asap-Regular"),
      url(https://fonts.gstatic.com/s/asap/v11/KFOoCniXp96ayzQe4GZNCzcFKw.woff2)
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
      U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Asap";
    font-style: normal;
    font-weight: 400;
    src: local("Asap Regular"), local("Asap-Regular"),
      url(https://fonts.gstatic.com/s/asap/v11/KFOoCniXp96ayzUe4GZNCzcFKw.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Asap";
    font-style: normal;
    font-weight: 400;
    src: local("Asap Regular"), local("Asap-Regular"),
      url(https://fonts.gstatic.com/s/asap/v11/KFOoCniXp96ayzse4GZNCzc.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  html {
    background-color: #fcfcfb;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    font-family: "Asap", sans-serif;
    color: #2e282a;
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head />

        <body>
          <Global styles={globalStyle} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
