import 'bootstrap/scss/bootstrap.scss';
import '@/styles/global.scss';
import {Meta} from "next/dist/lib/metadata/generate/meta";
import Head from "next/head";

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>BlackJack - NextJS</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default App;
