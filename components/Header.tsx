import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Drawer from 'components/Drawer'
import { Sun, Moon, Menu } from 'react-feather'
import Config from 'main.config'
import ConnectModal from 'components/modals/LoginModal'

export default function Header() {
    const { resolvedTheme, setTheme } = useTheme()
    const [showDrawer, setShowDrawer] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    function NavItem({ href, text }) {
        const router = useRouter()
        const isActive = router.asPath === href

        return (
            <Link
                href={href}
                className={`${
                    isActive
                        ? 'font-semibold text-neutral-800 dark:text-neutral-100'
                        : 'font-normal text-neutral-600 dark:text-neutral-400'
                } ${
                    href == '/' ? 'inline-block' : 'hidden'
                } transition-all  md:inline-block
                `}
            >
                <button className="capsize rounded-md px-4 py-2 text-xl transition-all duration-300 hover:bg-[#BC61F5] hover:font-bold hover:text-black md:text-base">
                    {text}
                </button>
            </Link>
        )
    }

    return (
        <>
            <ConnectModal
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
            />
            <div className="flex flex-col justify-center">
                <nav className="relative flex w-full items-center justify-between border-neutral-200 bg-opacity-60 pt-4 text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
                    {mounted && resolvedTheme && (
                        <ThemeButton
                            setTheme={setTheme}
                            resolvedTheme={resolvedTheme}
                        />
                    )}
                    <div>
                        <Drawer
                            setShowDrawer={setShowDrawer}
                            showDrawer={showDrawer}
                        />
                        <NavItem href="/" text={Config.siteName} />
                        <NavItem href="/docs/welcome" text="Documentation" />
                        <NavItem href="/blog" text="Blog" />
                    </div>
                    {mounted && (
                        <div className="flex">
                            <button
                                onClick={() => setModalVisibility(true)}
                                aria-label="Authentication"
                                type="button"
                                className={`hidden md:flex ${getHeaderButtonStyles()}`}
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                            <button
                                aria-label="Mobile Menu"
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-200 ring-neutral-300 transition-all hover:ring-2 dark:bg-neutral-700 md:hidden"
                                onClick={() => setShowDrawer(true)}
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </nav>
            </div>
            <hr className="border-1 mt-4 mb-8 w-full border-neutral-200 dark:border-neutral-800" />
        </>
    )
}

function getHeaderButtonStyles() {
    return 'h-9 w-9 items-center justify-center rounded-lg bg-neutral-200 transition-all hover:bg-[#BC61F5]                                             hover:text-black dark:bg-neutral-700 hover:dark:bg-[#BC61F5] '
}

function ThemeButton({ resolvedTheme, setTheme }) {
    return (
        <button
            aria-label="Toggle Dark / Light Theme"
            type="button"
            className={`flex ${getHeaderButtonStyles()}`}
            onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
        >
            {resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    )
}
