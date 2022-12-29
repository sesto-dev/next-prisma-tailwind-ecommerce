import { PlayIcon } from './Icons'

export default function VideoCard({ href, length, title, index }) {
    return (
        <a
            className="w-full"
            href={href}
            aria-label={title}
            target="_blank"
            rel="noreferrer">
            <div className="w-full transform border-b border-gray-200 py-3 transition-all hover:scale-[1.01] dark:border-gray-700">
                <div className="flex flex-col items-baseline justify-between sm:flex-row">
                    <div className="flex items-center">
                        <div className="mr-6 text-left text-gray-500 dark:text-gray-400">
                            {index}
                        </div>
                        <h4 className="w-full text-lg font-normal text-gray-800 dark:text-gray-100">
                            {title}
                        </h4>
                    </div>
                    <div className="mt-2 flex w-full items-center justify-between sm:mt-0 sm:w-auto">
                        <p className="mr-2 ml-10 w-32 text-left text-gray-500 dark:text-gray-400 sm:ml-0 sm:text-right md:mb-0">
                            {length}
                        </p>
                        <PlayIcon />
                    </div>
                </div>
            </div>
        </a>
    )
}
