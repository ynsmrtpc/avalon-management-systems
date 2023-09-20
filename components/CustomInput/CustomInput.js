import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";

export default function CustomInput({
                                        labelContent,
                                        inputID,
                                        inputPlaceholder,
                                        inputValue,
                                        onInputChange,
                                        type,
                                        isRequired,
                                        className,
                                        handleSubmit,
                                        rows,
                                        cols,
                                    }) {
    switch (type) {
        case "textarea":
            return (
                <>
                    <div className="form-control">
            <textarea
                className="textarea textarea-bordered text-base-content h-full"
                id={inputID}
                placeholder={inputPlaceholder}
                onChange={onInputChange}
                required={isRequired}
                rows={rows}
                cols={cols}
            >
              {inputValue}
            </textarea>
                    </div>
                </>
            );
            break;

        case "checkbox":
            return (
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">{labelContent}</span>
                        <input type="checkbox" checked={inputValue} className="checkbox"/>
                    </label>
                </div>
            )
            break;

        case "radio":
            const [checked, setChecked] = useState(null);
            useEffect(() => {
                setChecked(inputValue)
            },[inputValue])
            const handleToggleChange = () => {
                const newChecked = !checked;
                setChecked(newChecked);
                onInputChange(newChecked);
            };
            return (
                <>
                    <div className="form-control">
                        <label className="label cursor-pointer mb-2.5" htmlFor={inputID}>
                            <span className="label-text">{labelContent}</span>
                        </label>
                        <input type="checkbox" className="toggle" checked={inputValue} id={inputID}  onChange={handleToggleChange}/>
                    </div>
                </>
            )
            break;

        case "file":
            return (
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">{labelContent}</span>
                    </label>
                    <input type="file"
                           className={`file-input file-input-bordered text-base-content file-input-${className} w-full max-w-xs`}/>
                </div>
            );
            break;

        case "select":
            return (
                <div className="form-control w-full">
                    <label className="label" htmlFor={inputID}>
                        <span className="label-text">{labelContent}</span>
                    </label>
                    <select className={`select select-bordered ${className} text-base-content`} id={inputID}>
                        {inputValue}
                    </select>
                </div>
            )
            break;

        default:
            return (
                <>
                    <div className="form-control w-full h-28">
                        <label htmlFor={inputID} className="label">
                            <span className="label-text">{labelContent}</span>
                        </label>
                        <input
                            type={type}
                            id={inputID}
                            placeholder={inputPlaceholder}
                            value={inputValue}
                            onChange={onInputChange}
                            required={isRequired}
                            onKeyDown={handleSubmit}
                            className={`input input-bordered w-full text-base-content ${className}`}
                        />
                    </div>
                </>
            );
            break;
    }
}

CustomInput.propTypes = {
    labelContent: PropTypes.string,
    inputID: PropTypes.string,
    inputPlaceholder: PropTypes.any,
    children: PropTypes.element,
    type: PropTypes.string,
    className: PropTypes.string,
};

CustomInput.default = {
    labelContent: "Name Surname",
    inputID: "name_surname",
    placeholder: "Yunus Emre Topçu",
    children: "",
    type: "text",
    className: "",
};
