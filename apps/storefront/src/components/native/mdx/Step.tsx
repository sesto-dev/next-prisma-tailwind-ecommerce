export default function Step({ number, title }) {
   return (
      <div className="step flex items-center py-4">
         <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 pt-1 font-bold text-blue-500 dark:border-neutral-800">
            {number}
         </div>
         <h3 className="ml-3 font-bold tracking-tight">{title}</h3>
      </div>
   )
}
