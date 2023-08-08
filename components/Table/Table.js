export default function Table({theadContent, tbodyContent}) {
    return (<>
        <div className="relative max-h-full overflow-auto shadow-md sm:rounded-sm p-3">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    {theadContent}
                </tr>
                </thead>
                <tbody>
                    {tbodyContent}
                </tbody>
            </table>
        </div>
    </>)
}