import { useEffect, useState } from 'react'
import { CloseIcon } from './Icons'

export default function Toast({ message }) {
    const [toastVisibility, setToastVisibility] = useState(false)

    useEffect(() => {
        setToastVisibility(true)
        setTimeout(() => {
            setToastVisibility(false)
        }, 5000)
    }, [])

    if (toastVisibility)
        return (
            <div
                id="toast-warning"
                className="fixed right-5 bottom-5 z-30 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
                role="alert"
            >
                <div className="text-sm font-normal">{message}</div>
                <button
                    type="button"
                    className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    data-dismiss-target="#toast-warning"
                    aria-label="Close"
                    onClick={() => setToastVisibility(false)}
                >
                    <CloseIcon />
                </button>
            </div>
        )
}
