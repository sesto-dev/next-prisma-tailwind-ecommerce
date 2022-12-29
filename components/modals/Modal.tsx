import { CloseIcon } from '../Icons'

export default function Modal({
    children,
    title,
    modalVisibility,
    setModalVisibility,
}) {
    if (modalVisibility)
        return (
            <>
                <div
                    className="fixed top-0 left-0 z-10 h-full w-full bg-neutral-200/90 dark:bg-gray-900/90"
                    onClick={() => setModalVisibility(false)}
                />
                <div className="fixed top-1/2 left-1/2 z-20 mx-auto my-auto flex w-[60vw] max-w-lg -translate-y-1/2 -translate-x-1/2 flex-col gap-2 rounded-xl bg-white shadow-2xl dark:bg-gray-700 md:w-1/2">
                    <button
                        type="button"
                        className="absolute right-3 top-2 ml-auto inline-flex items-center rounded-lg bg-transparent p-3 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                        onClick={() => setModalVisibility(false)}
                    >
                        <CloseIcon />
                    </button>
                    <div className="mt-3 rounded-t py-2 px-6">
                        <small className="text-base font-normal text-gray-900 dark:text-neutral-400">
                            {title}
                        </small>
                    </div>
                    {children}
                </div>
            </>
        )
}
