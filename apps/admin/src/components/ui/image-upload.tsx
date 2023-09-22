'use client'

import { Button } from '@/components/ui/button'
import { ImagePlus, Trash } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageUploadProps {
   disabled?: boolean
   onChange: (value: string) => void
   onRemove: (value: string) => void
   value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
   disabled,
   onChange,
   onRemove,
   value,
}) => {
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => {
      setIsMounted(true)
   }, [])

   const onUpload = (result: any) => {
      onChange(result.info.secure_url)
   }

   if (!isMounted) {
      return null
   }

   return (
      <div>
         <div className="mb-4 flex items-center gap-4">
            {value.map((url) => (
               <div
                  key={url}
                  className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
               >
                  <div className="z-10 absolute top-2 right-2">
                     <Button
                        type="button"
                        onClick={() => onRemove(url)}
                        variant="destructive"
                        size="sm"
                     >
                        <Trash className="h-4" />
                     </Button>
                  </div>
                  <Image
                     fill
                     sizes="(min-width: 1000px) 30vw, 50vw"
                     className="object-cover"
                     alt="Image"
                     src={url}
                  />
               </div>
            ))}
         </div>
         <CldUploadWidget onUpload={onUpload} uploadPreset="t4drjppf">
            {({ open }) => {
               const onClick = () => {
                  open()
               }

               return (
                  <Button
                     type="button"
                     disabled={disabled}
                     variant="secondary"
                     onClick={onClick}
                     className="flex gap-2"
                  >
                     <ImagePlus className="h-4" />
                     <p>Upload an Image</p>
                  </Button>
               )
            }}
         </CldUploadWidget>
      </div>
   )
}

export default ImageUpload
