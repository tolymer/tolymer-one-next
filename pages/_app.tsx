import Head from "next/head";
import { usePing } from "../lib/hooks/usePing";

export default function App({ Component, pageProps }: any): JSX.Element {
  usePing();
  return (
    <>
      <Head>
        <title>Tolymer One - 麻雀スコアブック</title>
        <meta
          name="viewport"
          content="width=device-width,height=device-height"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
