import Link from 'next/link'
import { useState } from 'react'

export default function Cart() {
    const [components, setComponents] = useState([])

    return (
        <>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Write your thoughts here..."
        />
    )
}
