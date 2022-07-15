import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, { ResponsiveNavButton } from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Navigation = ({ user }) => {
    const router = useRouter()

    const { logout } = useAuth()

    const [open, setOpen] = useState(false)

    return (
        <nav className="bg-white border-b border-gray-100 items-center">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex mr-auto">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/dashboard">
                                <a>
                                    <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" />
                                </a>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href="/dashboard"
                                active={router.pathname === '/dashboard'}>
                                Dashboard
                            </NavLink>
                        </div>
                    </div>

                    <div className="flex items-center relative">
                                    <div className="dropdown relative">
                    <a className="
                        text-gray-500
                        hover:text-gray-700
                        focus:text-gray-700
                        mr-4
                        dropdown-toggle
                        hidden-arrow
                        flex items-center
                        " href="#" id="dropdownMenuButton1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell"
                        className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor"
                        d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z">
                        </path>
                    </svg>
                    <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5">1</span>
                    </a>
                    <ul className="
                    dropdown-menu
                    min-w-max
                    absolute
                    hidden
                    bg-white
                    text-base
                    z-50
                    float-left
                    py-2
                    list-none
                    text-left
                    rounded-lg
                    shadow-lg
                    mt-1
                    hidden
                    m-0
                    bg-clip-padding
                    border-none
                    left-auto
                    right-0
                    " aria-labelledby="dropdownMenuButton1">
                    <li>
                        <a className="
                        dropdown-item
                        text-sm
                        py-2
                        px-4
                        font-normal
                        block
                        w-full
                        whitespace-nowrap
                        bg-transparent
                        text-gray-700
                        hover:bg-gray-100
                        " href="#">Action</a>
                    </li>
                    </ul>
                </div>
                    </div>

                    {/* Settings Dropdown */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                    <div>{user?.name}</div>

                                    <div className="ml-1">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }>

                            {/* Authentication */}
                            <DropdownButton onClick={logout}>
                                Logout
                            </DropdownButton>
                        </Dropdown>
                    </div>

                    

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={router.pathname === '/dashboard'}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-10 w-10 fill-current text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div className="ml-3">
                                <div className="font-medium text-base text-gray-800">
                                    {user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* Authentication */}
                            <ResponsiveNavButton onClick={logout}>
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
