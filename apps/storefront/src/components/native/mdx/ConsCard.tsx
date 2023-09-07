import { CheckSquareIcon } from 'lucide-react'

export default function ConsCard({ title, cons }) {
   return (
      <div className="my-6 w-full rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-900">
         <span>{`You might not use ${title} if...`}</span>
         <div className="mt-4">
            {cons.map((con) => (
               <div
                  key={con}
                  className="mb-2 flex gap-2 items-baseline font-normal"
               >
                  <CheckSquareIcon className="h-4" />
                  <span>{con}</span>
               </div>
            ))}
         </div>
      </div>
   )
}
