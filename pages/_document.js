import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="tr" data-bs-theme={"dark"}>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div className={"position-fixed start-50 translate-middle-x bottom-0 p-3"}>
            <p className={"mb-0 text-white"}>Developed by <a href="https://www.tufangokmenler.com" className={"text-warning text-decoration-none"} target="_blank">Tufan Gökmenler</a> | Visit my <a href="https://github.com/tufkan1/" target={"_blank"} className={"text-warning text-decoration-none"}>Github</a></p>
        </div>
      </body>
    </Html>
  )
}
