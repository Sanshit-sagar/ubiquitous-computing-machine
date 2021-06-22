

const Sidebar = ({ }) => {


    return (
        <div className="w-full py-6 flex flex-col items-center">         
            <div className="flex-shrink-0 flex items-center text-white">
                <Logo />
            </div>
            
            <div className="flex-col mt-6 w-full px-3 space-y-1 bg-gray-900 text-white border-gray-50">
                {sidebarNavigation.map((item) => (
                    <button
                        key={item.name}
                        route={item.href}
                        className={classNames(
                            item.current ? 'text-white': 'text-black bg-white'+
                            'font-lightest group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        onClick={() => handleNavigation(item.href)}
                    >
                        <item.icon
                            className={classNames(item.current ? 'bg-yellow' : 'text-white h-6 w-6')}
                            aria-hidden="true"
                        >
                            <span className="mt-2"> {item.name} </span>
                        </item.icon>
                    </button>
                ))}
            </div>
        </div>
    )
}