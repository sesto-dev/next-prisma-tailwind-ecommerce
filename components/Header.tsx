import {
    SunIcon,
    MoonIcon,
    UserPlusIcon,
    UserIcon,
    UserMinusIcon,
    LanguageIcon,
    ShoppingCartIcon,
    MagnifyingGlassIcon,
    Bars3Icon,
} from '@heroicons/react/24/solid'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from 'state/Auth'
import Drawer from 'components/Drawer'
import SearchModal from 'components/modals/SearchModal'
import LoginModal from 'components/modals/LoginModal'

export default function Header() {
    const { resolvedTheme, setTheme } = useTheme()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    const [mounted, setMounted] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)
    const [searchModalVisibility, setSearchModalVisibility] = useState(false)
    const [loginModalVisibility, setLoginModalVisibility] = useState(false)

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), [])

    function NavItem({ href, text }) {
        const router = useRouter()
        const isActive = router.asPath === href

        return (
            <Link
                href={href}
                className={`${
                    isActive
                        ? 'font-semibold text-gray-800 dark:text-gray-200'
                        : 'font-normal text-gray-600 dark:text-gray-400'
                } ${
                    href == '/' ? 'inline-block' : 'hidden'
                } transition-all  sm:px-3 sm:py-2 md:inline-block
                `}
            >
                <span className="capsize transition duration-300 hover:text-purple-600">
                    {text}
                </span>
            </Link>
        )
    }

    return (
        <>
            <LoginModal
                modalVisibility={loginModalVisibility}
                setModalVisibility={setLoginModalVisibility}
            />
            <div className="flex flex-col justify-center">
                <nav className="relative flex w-full items-center justify-between border-gray-200 bg-opacity-60 pt-4 text-gray-900 dark:border-gray-700 dark:text-gray-100">
                    <div className="flex">
                        <button
                            aria-label="Toggle Dark / Light Theme"
                            type="button"
                            className={`hidden md:flex ${getHeaderButtonStyles()}`}
                            onClick={() =>
                                setTheme(
                                    resolvedTheme === 'dark' ? 'light' : 'dark'
                                )
                            }
                        >
                            {resolvedTheme === 'dark' ? (
                                <SunIcon className="h-5 w-5" />
                            ) : (
                                <MoonIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <div>
                        <Drawer
                            setShowDrawer={setShowDrawer}
                            showDrawer={showDrawer}
                        />
                        <NavItem href="/" text="Hiva" />
                        <NavItem href="/products" text="Products" />
                        <NavItem href="/blog" text="Blog" />
                        <NavItem href="/docs/welcome" text="Documentation" />
                    </div>
                    {mounted && (
                        <div className="flex">
                            {isAuthenticated ? (
                                <Link href="/user">
                                    <button
                                        aria-label="Authentication"
                                        type="button"
                                        className={`hidden md:flex ${getHeaderButtonStyles()}`}
                                    >
                                        <UserIcon className="h-5 w-5" />
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    onClick={() =>
                                        setLoginModalVisibility(true)
                                    }
                                    aria-label="Authentication"
                                    type="button"
                                    className={`hidden md:flex ${getHeaderButtonStyles()}`}
                                >
                                    <UserPlusIcon className="h-5 w-5" />
                                </button>
                            )}
                            <button
                                aria-label="Mobile Menu"
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-700 md:hidden"
                                onClick={() => setShowDrawer(true)}
                            >
                                <Bars3Icon className="h-5 w-5 " />
                            </button>
                        </div>
                    )}
                </nav>
            </div>
            <hr className="border-1 mt-4 mb-8 w-full border-gray-200 dark:border-gray-800" />
        </>
    )
}

function getHeaderButtonStyles() {
    return 'h-9 w-9 items-center justify-center rounded-lg bg-gray-200 transition-all hover:bg-purple-600                                             hover:text-white dark:bg-gray-700 hover:dark:bg-purple-600'
}
