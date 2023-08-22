import classNames from "classnames";
import PropTypes from "prop-types";

export default function Alert({error, message}) {
    return (
        <>
            <div className={classNames("px-3 py-2 rounded-md text-white", {
                "bg-red-400 dark:bg-red-600": error === 1,
                "bg-green-400 dark:bg-green-600": error === 0
            })}>
                {message}
            </div>
        </>
    )
}

Alert.propTypes = {
    error: PropTypes.number,
    message: PropTypes.string
}