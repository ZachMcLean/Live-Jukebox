import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'

// This is the main part of the app where we render out all the components onto the screen
export default function Home() {
  return (
    // The main bg is h-screen(height of screen) which allows the contents to overflow off of the page
    // and allows the user to scroll independent of other components
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Live Jukebox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <h1>This is a Dope spotify 2.0 Build</h1> */}
      
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      {/* <div>Music Controller</div> */}
    </div>
  )
}
