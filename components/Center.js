import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';


const colors = [
    "from-indigo-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
    "from-blue-500",
]

function Center() {
  // remember we can use the session to have access to the users profile picture and name
  const { data: session } = useSession();
  const [ color, setColor ] = useState(null);
  const [ playlistId, setPlaylistId ] = useRecoilState(playlistIdState);

  useEffect(() => {
    // shuffle the array and pop a color off the top (this is like randomizing)
      setColor(shuffle(colors).pop());
  }, []);

  return (
    <div className="flex-grow text-white">
        {/* here we can set the header button at the top right 
        as absolute so it is stuck on the screen */}
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 
        opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2 className="">{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b 
      to-black ${color} h-80 text-white padding-8`}
      >
          {/* <img src=""/> */}
          <h1>Center</h1>
      </section>
    </div>
  );
}

export default Center;
