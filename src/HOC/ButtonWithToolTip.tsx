import React from "react";
import { Tooltip } from "react-tooltip";

const ButtonWithToolTip = (Component, tooltipContent, tooltipClassName) => {
    const NewComponent = ({ ...props }) => {
        return (
            <>
                <span className="label-tooltip" data-tooltip-content={tooltipContent}>
                    <Component {...props} />
                </span>
                <Tooltip
                    className={tooltipClassName}
                    anchorSelect=".label-tooltip"
                    place="bottom"
                    style={{ zIndex: 10 }}
                />
            </>
        );
    };
    NewComponent.displayName = "displayName";

    return (props) => <NewComponent {...props} />;
};

ButtonWithToolTip.displayName = "ButtonWithToolTip";

export default ButtonWithToolTip;
