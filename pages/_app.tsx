import Head from "next/head";

export default function App({ Component, pageProps }: any): JSX.Element {
  return (
    <>
      <Head>
        <title>Tolymer One - 麻雀スコアブック</title>
        <meta name="description" content="麻雀スコアブック" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
