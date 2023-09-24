import {useState} from "react";

export default function ModalSubmit({modalSubmit, text}) {
    const [btnText, setBtnText] = useState(text);
    return (
        <button
            onClick={() => {
                setBtnText(<span className="loading loading-spinner loading-xs"></span>)
                modalSubmit()
            }}
            className="fixed bottom-4 right-4 w-24 btn btn-success">
            {btnText}
        </button>
    )
}