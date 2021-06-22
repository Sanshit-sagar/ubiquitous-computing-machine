
const ProfileMenu = ({ userNavigation }) => {
    const router = useRouter()
    const menuRef = useRef();
    const [session, loading] = useSession()
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)
    const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false)
    
    const toggleMenu = () => {
        dispatch({
            type: 'toggle',
            payload: {
                key: 'menuOpen'
            }
        })
    }

    const handleNavigation = (id) => {
        if(id !== currentPage) {
            router.push(`/${id}`)
            dispatch({
                type: 'navigate',
                payload: {
                    route: `${id}`
                }
            });
        } else {
            toast((t) => (
                <span>
                  Already here
                  <button onClick={() => toast.dismiss(t.id)}>
                        Dismiss
                  </button>
                </span>
            ));
        }
    }


    if(!session && !loading) {
        return (
            <button
                type="button"
                onClick={() => signOut()}
                className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
            >
                { session && !loading ? `hi! ${session.user.name}` : 'Login' }
            </button>
        )
    }

    if(loading) return <p> loading... </p>

    return (
        <div className="inline-flex justify-start align-center">
            <div className="relative mr-10" ref={menuRef}>
                <div
                    className="flex justify-start items-center space-x-1 sm:space-x-2"
                    role="button"
                    onClick={toggleMenu}
                >
                    <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="rounded-full border-1 border-gray-200 hover:ring-2 hover:ring-white w-8 h-8"
                    />
                </div>

                <FlyoutMenu
                    links={userNavigation}
                    show={isLargeScreen && state.menuOpen}
                    containerRef={menuRef}
                    onClose={toggleMenu}
                    handleNavigation={handleNavigation}
                />
            </div>
        </div>
    );
}
