import PropTypes from "prop-types";

export default function CustomInput({labelContent, inputID, inputPlaceholder}) {

    return (
        <>
            <label htmlFor="name_surname">{labelContent}</label>
            <input className="block rounded py-1.5 w-full bg-[#f9fafb] dark:bg-[#394051] px-3 focus:bg-[#fbfdd8] dark:focus:bg-[#4b5563] transition-[background-color] outline-[#4b5563]" id={inputID} placeholder={inputPlaceholder}/>
        </>
    )
}

CustomInput.propTypes = {
    labelContent: PropTypes.string,
    inputID: PropTypes.string,
    inputPlaceholder: PropTypes.any
}

CustomInput.default = {
    labelContent: 'Name Surname',
    inputID:'name_surname',
    placeholder: 'Yunus Emre Topçu'
}