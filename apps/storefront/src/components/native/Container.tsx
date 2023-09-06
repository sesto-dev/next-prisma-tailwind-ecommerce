export default function Container({ children }) {
   return (
      <div className="px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
         {children}
      </div>
   )
}
