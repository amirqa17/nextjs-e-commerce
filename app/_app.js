
import Layout from './layout';
import Head from 'next/head';
import { CartProvider } from "../context/CartContext";
const App = ({ Component, pageProps }) => {


  return (

    <CartProvider>
      <Layout>
      <Head>
        <title>Amir Ibraimov</title>
        <meta name="description" content="Товары для геймеров в Казахстане. Магазин электроники в Казахстане. Купить игровую мышь в Казахстане, купить монитор в Казахстане, купить клавиатуру в Казахстане, купить Монитор в Казахстане." />
      </Head>
        <Component {...pageProps} />
      </Layout>
</CartProvider>
  );
};

export default App;
