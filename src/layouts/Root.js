import Head from 'next/head'
import Controls from '@/components/Controls'
import Menu from '@/components/Menu'
import Modal from '@/components/Modal'
import FrameTimeline from '@/components/FrameTimeline';
import { ControlsProvider } from '@/components/ControlsContext';

export default function RootLayout({ children }) {
  return(
    <>
      <Head>
        <title>ASCII Animator</title>
        <link rel="icon" href="/assets/images/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content="An open-source tool for creating plain text animations in the style of ASCII art" />
        <meta name="twitter:title" content="ASCII Animator" />
        <meta name="twitter:site" content="https://bradysheridan.com" />
        <meta name="twitter:image" content="" />
      </Head>

      <ControlsProvider>
        <main>
          <Menu>
            <Controls />
          </Menu>

          <div className="content">
            {children}
          </div>
            
          <FrameTimeline />

          <Modal />
        </main>
      </ControlsProvider>
    </>
  );
}