import Link from 'next/link'
import { getLinkStyles } from 'lib/styles'
import {
    GitHubLogoIcon,
    InstagramLogoIcon,
    TwitterLogoIcon,
} from '@radix-ui/react-icons'

export default function Footer() {
    return (
        <footer>
            <hr className="border-1 my-10 w-full border-neutral-200 dark:border-neutral-800" />
            <div className="md:flex md:justify-between">
                <div className="mb-6 hidden md:mb-0 md:block">
                    <span className="flex flex-col">
                        <h2 className="whitespace-nowrap text-sm font-semibold uppercase text-black dark:text-white">
                            Pasargad
                        </h2>
                        <span className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                            © {new Date().getFullYear()} Pasargad™ . All
                            Rights Reserved.
                        </span>
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
                    <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase text-neutral-900 dark:text-white">
                            Resources
                        </h2>
                        <ul className="text-neutral-600 dark:text-neutral-400">
                            <li className="mb-2 text-sm">
                                <Link href="/blog" className={getLinkStyles()}>
                                    Blog
                                </Link>
                            </li>
                            <li className="text-sm">
                                <Link
                                    href="/tutorials"
                                    className={getLinkStyles()}
                                >
                                    Tutorials
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase text-neutral-900 dark:text-white">
                            Follow us
                        </h2>
                        <ul className="text-neutral-600 dark:text-neutral-400">
                            <li className="mb-2 text-sm">
                                <a
                                    href="https://github.com/accretence"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={getLinkStyles()}
                                >
                                    Github
                                </a>
                            </li>
                            <li className="text-sm">
                                <a
                                    href="https://discord.gg/4eeurUVvTy"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={getLinkStyles()}
                                >
                                    Discord
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase text-neutral-900 dark:text-white">
                            Legal
                        </h2>
                        <ul className="text-neutral-600 dark:text-neutral-400">
                            <li className="mb-2 text-sm">
                                <a href="#" className={getLinkStyles()}>
                                    Privacy Policy
                                </a>
                            </li>
                            <li className="text-sm">
                                <Link href="#" className={getLinkStyles()}>
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="mt-8 border-neutral-200 dark:border-neutral-800 sm:mx-auto" />
            <div className="mt-8 mb-12 flex justify-center space-x-6">
                <a
                    href="https://instagram.com/accretence"
                    target="_blank"
                    rel="noreferrer"
                    className={`${getLinkStyles()} + text-neutral-500`}
                >
                    <InstagramLogoIcon />
                    <span className="sr-only">Instagram page</span>
                </a>
                <a
                    href="https://twitter.com/accretence"
                    target="_blank"
                    rel="noreferrer"
                    className={`${getLinkStyles()} + text-neutral-500`}
                >
                    <TwitterLogoIcon />
                    <span className="sr-only">Twitter page</span>
                </a>
                <a
                    href="https://github.com/accretence"
                    target="_blank"
                    rel="noreferrer"
                    className={`${getLinkStyles()} + text-neutral-500`}
                >
                    <GitHubLogoIcon className="h-4 w-4" />
                    <span className="sr-only">GitHub account</span>
                </a>
            </div>
        </footer>
    )
}
