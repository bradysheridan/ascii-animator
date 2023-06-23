import Head from 'next/head'
import Controls from '@/components/Controls'
import FrameTimeline from '@/components/FrameTimeline';
import { ControlsProvider } from '@/components/ControlsContext';

{/* <ControlsContext.Provider
value={{
  bookList,
  setBookList,
  savedBooks,
  setSavedBooks,
}}
>
{props.children}
</ControlsContext.Provider> */}

export default function RootLayout({ children }) {
  return(
    <>
      <Head>
        <title>ASCII Tracer</title>
        <link rel="icon" href="/assets/images/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content="A tool for tracing images into ASCII sketches." />
        <meta name="twitter:title" content="ASCII Tracer" />
        <meta name="twitter:site" content="https://bradysheridan.com" />
        <meta name="twitter:image" content="" />
      </Head>

      <ControlsProvider>
        <main>
          <Controls />

          <div className="content">
            {children}
          </div>
            
          <FrameTimeline />
        </main>
      </ControlsProvider>
    </>
  );
}