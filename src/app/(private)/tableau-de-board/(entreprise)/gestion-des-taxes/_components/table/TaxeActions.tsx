"use client"

import React from "react";



type TaxeActionsProps = {
    payload: any;
    canDelete: boolean;
    canUpdate: boolean;
    canUpload: boolean;
};
const TaxeActions = ({ payload, canDelete, canUpdate, canUpload }: TaxeActionsProps) => {
    return (
        <div>
            actions
        </div>
    );
};

export default TaxeActions;