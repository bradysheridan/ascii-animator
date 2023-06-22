import Root from "@/layouts/Root";
import 'remixicon/fonts/remixicon.css';
import '@/styles/main.css';

export default function App({ Component, pageProps }) {
  return(
    <Root>
      <Component {...pageProps} />
    </Root>
  )
}