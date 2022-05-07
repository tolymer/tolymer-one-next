import Head from "next/head";

export default function App({ Component, pageProps }: any): JSX.Element {
  const apiHost =
    process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";
  return (
    <>
      <Head>
        <title>Tolymer One - 麻雀スコアブック</title>
        <meta name="description" content="麻雀スコアブック" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height"
        />
        <link rel="preload" href={`${apiHost}/ping`} as="fetch" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
