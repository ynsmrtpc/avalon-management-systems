import PropTypes from "prop-types";
export default function CustomInput({children, labelContent, inputID, inputPlaceholder,inputValue, onInputChange, type }) {
    return (
        <>
            <label htmlFor={inputID}>{labelContent}</label>
            <input
                className="block rounded py-1.5 w-full bg-[#f1f1f1f1] dark:bg-[#394051] px-3 focus:bg-white dark:focus:bg-card_bg_dark
                                transition-[background-color] outline-[#4b5563]"
                type={type}
                id={inputID}
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={onInputChange}
            />
            {children}
        </>
    )
}

CustomInput.propTypes = {
    labelContent: PropTypes.string,
    inputID: PropTypes.string,
    inputPlaceholder: PropTypes.any,
    children: PropTypes.element,
    type:PropTypes.string
}

CustomInput.default = {
    labelContent: 'Name Surname',
    inputID: 'name_surname',
    placeholder: 'Yunus Emre Topçu',
    children: "",
    type: "text"
}