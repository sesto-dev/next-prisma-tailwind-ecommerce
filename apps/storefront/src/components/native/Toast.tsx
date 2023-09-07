import { useEffect, useState } from 'react'
import { DeleteIcon } from 'lucide-react'

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
            className="fixed right-5 bottom-5 z-30 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
            role="alert"
         >
            <div className="text-sm font-normal">{message}</div>
            <button
               type="button"
               className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-white"
               data-dismiss-target="#toast-warning"
               aria-label="Close"
               onClick={() => setToastVisibility(false)}
            >
               <DeleteIcon className="h-4" />
            </button>
         </div>
      )
}
