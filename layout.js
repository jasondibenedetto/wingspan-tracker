import Head from 'next/head';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Wingspan Tracker</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <main>{children}</main>
  </>
);

export default Layout;
