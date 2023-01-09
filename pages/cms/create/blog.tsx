import Link from 'next/link'
import { useState } from 'react'

export default function Cart() {
    const [components, setComponents] = useState([])

    return (
        <>
            <label className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white">
                Your message
            </label>
            {components.map((component, index) => {
                if ((component = 'TextArea')) return <TextArea />
            })}
        </>
    )
}

function TextArea() {
    return (
        <textarea
            id="message"
            className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Write your thoughts here..."
        />
    )
}
