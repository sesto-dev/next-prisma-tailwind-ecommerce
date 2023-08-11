import { useEffect, useState } from 'react'
import Modal from './Modal'
import { Search } from 'react-feather'

export default function SearchModal({ modalVisibility, setModalVisibility }) {
    return (
        <Modal
            title="Search"
            modalVisibility={modalVisibility}
            setModalVisibility={setModalVisibility}
        >
            <form>
                <label className="sr-only text-sm font-medium text-neutral-900 dark:text-neutral-300">
                    Search
                </label>
                <div className="flex gap-2 px-4">
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-900  dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
                        placeholder="Search Products, Blogs..."
                        required
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition duration-300 hover:bg-black"
                    >
                        <Search className="h-6 w-6" />
                    </button>
                </div>
            </form>
            <div
                role="status"
                className="mt-4 max-w-sm animate-pulse px-4 pb-6"
            >
                <div className="mb-4 h-2.5 w-48 rounded-full bg-neutral-200 dark:bg-neutral-600"></div>
                <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-neutral-200 dark:bg-neutral-600"></div>
                <div className="mb-2.5 h-2 rounded-full bg-neutral-200 dark:bg-neutral-600"></div>
                <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-neutral-200 dark:bg-neutral-600"></div>
                <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-neutral-200 dark:bg-neutral-600"></div>
                <div className="h-2 max-w-[360px] rounded-full bg-neutral-200 dark:bg-neutral-600"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </Modal>
    )
}
