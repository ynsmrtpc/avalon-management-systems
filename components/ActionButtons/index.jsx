export default function ActionButtons({editHandle, deleteHandle}) {
    return (
        <div className="grid grid-cols-2 gap-x-5 md:gap-x-2">
            <button onClick={editHandle} className="btn btn-outline btn-success btn-xs col-span-1">
                <i className="fa fa-edit"></i>
            </button>
            <button onClick={deleteHandle} className="btn btn-outline btn-error btn-xs col-span-1">
                <i className="fa fa-trash"></i>
            </button>
        </div>
    )
}