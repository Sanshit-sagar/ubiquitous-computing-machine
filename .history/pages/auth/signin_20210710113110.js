import React, { useState, useEffect } from 'react'


const LoginPage = () => {

    return (
        <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 flex flex-col">
                {/* <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                    <a href="#" class="bg-black text-white font-bold text-xl p-4">
                        Logo
                    </a>
                </div> */}

                <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    
                    <button className="w-50 px-10 py-2 bg-black text-white m-5 rounded-md shadow-lg">
                        Github
                    </button>
                    <button className="w-50 px-10 py-2 bg-black text-white m-5 rounded-md shadow-lg">
                        Google
                    </button>
                    <button className="w-50 px-10 py-2 bg-black text-white m-5 rounded-md shadow-lg">
                        Facebook
                    </button>

                </div>
            </div>

            <div className="w-1/2 shadow-2xl">
                <img 
                    className="object-cover w-full h-screen hidden md:block" 
                    src="https://source.unsplash.com/IXUM4cJynP0" 
                />
            </div>
        </div>
    )
}

export default LoginPage