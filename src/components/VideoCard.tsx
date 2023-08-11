import { PlayIcon } from './icons'

export default function VideoCard({ href, length, title, index }) {
    return (
        <a
            className="w-full"
            href={href}
            aria-label={title}
            target="_blank"
            rel="noreferrer"
        >
            <div className="w-full transform border-b border-neutral-200 py-3 transition-all hover:scale-[1.01] dark:border-neutral-700">
                <div className="flex flex-col items-baseline justify-between sm:flex-row">
                    <div className="flex items-center">
                        <div className="mr-6 text-left text-neutral-500 dark:text-neutral-400">
                            {index}
                        </div>
                        <h4 className="w-full text-lg font-normal text-neutral-800 dark:text-neutral-100">
                            {title}
                        </h4>
                    </div>
                    <div className="mt-2 flex w-full items-center justify-between sm:mt-0 sm:w-auto">
                        <p className="mr-2 ml-10 w-32 text-left text-neutral-500 dark:text-neutral-400 sm:ml-0 sm:text-right md:mb-0">
                            {length}
                        </p>
                        <PlayIcon />
                    </div>
                </div>
            </div>
        </a>
    )
}
