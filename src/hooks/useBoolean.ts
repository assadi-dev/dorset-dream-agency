import React from "react";

const useBoolean = () => {
    const [value, toggle] = React.useReducer((state: boolean) => !state, false);
    return { value, toggle };
};

export default useBoolean;
