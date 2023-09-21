export default function StatusControl({status}) {
    return (
        <i
            className={`fa fa-${
                status === 1
                    ? "heart text-success"
                    : "heart-crack text-error"
            }`}
        ></i>
    )
}