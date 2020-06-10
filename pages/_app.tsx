import Head from "next/head";

export default function App({ Component, pageProps }: any): JSX.Element {
  return (
    <>
      <Head>
        <title>Tolymer One</title>
        <meta name="description" content="麻雀スコア集計ブック" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height"
          key="viewport"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
