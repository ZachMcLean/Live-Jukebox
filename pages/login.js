import { getProviders, signIn } from 'next-auth/react';

// So now that we have the authentication portion of the app setup, we need to 
// use a server side render to get all of the providers within our NextAuth function
// In order to do this we have to render them on the server
function Login({ providers }) {
    return (
        <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
            <img className='w-52 mb-5' src='https://links.papareact.com/9xl' alt=' '/>

            {Object.values(providers).map((provider) => (
                // it is apparently good practice to 
                // add a key when mapping over something
                // bc it makes react faster
                <div key={provider.name}>
                    <button className='bg-[#18D860] text-white rounded-full p-5'
                    onClick={ () => signIn(provider.id, { callbackUrl: '/' })} 
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}

        </div>
    )
}

export default Login

// This will run on the server before the page gets delivered
// anytime someone comes to the page we want to query all of 
// the providers on the server and deliver them to the client
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}
