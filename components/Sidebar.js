import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react'
//import spotifyApi from '../lib/spotify';
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';



function Sidebar() {
    // setup the useSpotify() hook
    const spotifyApi = useSpotify();

    // When we log the user out we want to be able to send them back to the login page
    // In order to do this we have to persist the state of the app
    // we will add a session provider to _app.js
    const { data: session, status } = useSession();


    // Playlist Functionality
    const [ playlists, setPlaylists ] = useState([]);
    // when my sidebar mounts, this useEffect will run
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session, spotifyApi]);

    // console.log(playlists);
    return (
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen '>
            <div className='space-y-4'>
                {/* Every element in this div, is a child of this div
                    This means we can actually space out the individual children in the div
                    by adding apce to the y & x axis
                 */}
                <button className="flex items-center space-x-2 hover:text-white"> 
                    <HomeIcon className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white"
                onClick={() => signOut()}
                >
                    <SearchIcon className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className='h-5 w-5' />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"/>

                <button className="flex items-center space-x-2 hover:text-white"> 
                    <PlusCircleIcon className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className='h-5 w-5' />
                    <p>Your episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"/>

                {/* Now after rendering the select options in the sideBar, we can add the 
                    Playlists underneath to fill out the rest of the sidebar
                 */}

                 {/* Playlists */}
                 {playlists.map((playlist) => (
                    <p key={playlist.id} className='cursor-pointer hover:text-white'>
                       {playlist.name}
                   </p>
                 ))}
            </div>
        </div>
    );
}

export default Sidebar
