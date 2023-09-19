import PropTypes from "prop-types";

export default function CustomInput({
  children,
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
              className="textarea textarea-bordered h-full"
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
    default:
      return (
        <>
          <div className="form-control w-full max-w-xs">
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
              className={`input input-bordered w-full max-w-xs ${className}`}
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
