export default function Table({ children, headers }) {
    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="text-sm text-gray-500 first-letter:text-left dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="">
                        {headers &&
                            headers.map((header) => (
                                <th
                                    key={header}
                                    scope="col"
                                    className="py-3 px-6"
                                >
                                    {header}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody className="">{children}</tbody>
            </table>
        </div>
    )
}
