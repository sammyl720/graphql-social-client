import {
  ApolloProvider
} from "@apollo/client";
import Head from 'next/head'
import client from "../apollo";
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Layout from "../components/Layout";
import Provider from "../context/general/Provider";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" referrerPolicy="no-referrer" />
        <link rel="shortcut icon" href="imgs/world.png" type="image/png" />
          <title>
            Kesher | HOME
          </title>
        </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
    </ApolloProvider>
  )
}
export default MyApp
