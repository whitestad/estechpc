import { useState, useEffect } from 'react';

function useInput(initialValue, onChanged = null) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        setValue(event.target.value);

        onChanged && onChanged(event.target.value);
    };

    // useEffect(() => {
    //     console.log("Значение изменено на: ", value);
    // }, [value]);

    return {
        value,
        onChange: handleChange,
        setValue: setValue
    };
}

export default useInput;