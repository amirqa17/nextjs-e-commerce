import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Layout from './layout';
import Head from 'next/head';

const App = ({ Component, pageProps }) => {


  return (
    console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
    console.log("Auth Domain:", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
    // ... add logs for other variables
    
      <Layout>
      <Head>
        <title>Amir Ibraimov</title>
        <meta name="description" content="Товары для геймеров в Казахстане. Магазин электроники в Казахстане. Купить игровую мышь в Казахстане, купить монитор в Казахстане, купить клавиатуру в Казахстане, купить Монитор в Казахстане." />
       
      </Head>
        <Component {...pageProps} />
      </Layout>

  );
};

export default App;
