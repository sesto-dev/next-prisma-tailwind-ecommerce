export default function Table({ children, headers }) {
    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="text-sm text-neutral-500 first-letter:text-left dark:text-neutral-400">
                <thead className="bg-neutral-50 text-xs uppercase text-neutral-700 dark:bg-neutral-700 dark:text-neutral-400">
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
                <tbody>{children}</tbody>
            </table>
        </div>
    )
}
