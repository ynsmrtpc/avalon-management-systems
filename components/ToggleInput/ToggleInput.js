import React, {useEffect, useState} from 'react';

export default function ToggleInput({  labelContent, isChecked, onChange  }) {
    const [checked, setChecked] = useState(null);
    useEffect(() => {
        setChecked(isChecked)
    },[isChecked])
    const handleToggleChange = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        onChange(newChecked);
    };
    return (
        <>
            <label
                className="block pr-[0.55rem] hover:cursor-pointer"
                htmlFor={labelContent}
            >
                {labelContent}
            </label>
            <input
                checked={checked}
                className="toggle"
                type="checkbox"
                role="switch"
                id={labelContent}
                onChange={handleToggleChange}
            />
        </>
    );
}
