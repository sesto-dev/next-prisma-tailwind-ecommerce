import { CheckSquareIcon } from 'lucide-react'

export default function ProsCard({ title, pros }) {
   return (
      <div className="my-4 w-full rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-900">
         <span>{`You might use ${title} if...`}</span>
         <div className="mt-4">
            {pros.map((pro) => (
               <div
                  key={pro}
                  className="mb-2 flex gap-2 items-baseline font-normal"
               >
                  <CheckSquareIcon className="h-4" />
                  <span>{pro}</span>
               </div>
            ))}
         </div>
      </div>
   )
}
