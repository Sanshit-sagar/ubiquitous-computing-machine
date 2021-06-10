import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const menuItems = [
    {id: 0, title: 'Preferences' },
    {id: 1, title: 'Personnel', }
];

// const DropdownMenuButton = () => {

//     return (
//         <a
//             href="#"
//             className={classNames(
//             active 
//                 ? 'bg-gray-100 text-gray-900' 
//                 : 'text-gray-700',
//                 ? 'block px-4 py-2 text-sm'
//             )}
//         >
//     )
// }

function DropdownMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
              <AliasingLinks /> 
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            >
              <div className="px-4 py-3">
                <p className="text-sm">Signed in as</p>
                <p className="text-sm font-medium text-gray-900 truncate">tom@example.com</p>
              </div>

            {Object.entries(menuItems).map(function(value, index, array) {
                return (
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                href="#"
                                className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                )}
                                >
                                    {valid.title}
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                );
            })}

            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default DropdownMenu 