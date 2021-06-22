import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import Icon from '@supabase/ui'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { fetchAndWait } from '../lib/fetchWrapper'

import DarkModeButton from '../components/DarkModeButton/index'
import ProfileMenu from '../components/ProfileMenu/index'

import toast from 'react-hot-toast'
import Logo from '../components/Logo'

const Header = () => {
    const router = useRouter()
    const [session, loading] = useSession()

    const [activeSlug, setActiveSlug] = useState('')
    const [fetchLoading, setFetchLoading] = useState(false)

    useEffect(() => {
        if (activeSlug) setActiveSlug(activeSlug.toLowerCase())
      }, [activeSlug])

    const goToSlug = async(event) => {
        event.preventDefault()
        event.stopPropagation()
    
        setFetchLoading(true)
        const org = await fetchAndWait(`https://api.github.com/orgs/${activeSlug.toLowerCase()}`)
        if (org.login) {
          router.push(`/${org.login}`)
        } else {
          toast.error(`The slug ${activeSlug} cannot be found`)
        }
        setFetchLoading(false)
    }


    return (
        <div className={`px-2 shadow bg-black h-14 flex items-center`}>
            <div className="mx-auto container flex items-center justify-between">
                {/* <div className="flex-1 flex items-center justify-start">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div> */}

                <div className="flex-1 flex items-start justify-start">
                    <form
                        onSubmit={(e) => goToSlug(e)}
                        className={`
                            flex items-center bg-white text-black font-mono px-2 rounded-sm
                            text-sm ${fetchLoading ? 'opacity-75' : ''}
                        `}
                    >
                        <p className="hidden sm:block"> slugged.cutely </p>
                        <input
                            type="text"
                            value={activeSlug}
                            onChange={(e) => setActiveSlug(e.target.value)}
                            placeholder="/slug"
                            disabled={fetchLoading}
                            className="flex bg-white text-black border-transparent"
                        />
                        {fetchLoading && <Icon type="Loader" size={18} strokeWidth={2} className="animate-spin" />}
                    </form>
                </div>

                <div className="flex-1 flex items-center justify-end">
                    <DarkModeButton />
                    <div className="cursor-pointer relative ">
                    {session && session.user
                        ? (
                            <div
                                onClick={() => router.push('/profile')}
                                style={{ backgroundImage: `url('${session.user.image}')` }}
                                className="h-8 w-8 bg-no-repeat bg-center bg-cover rounded-full" 
                            />
                        )
                        : (
                            <ProfileMenu /> 
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header