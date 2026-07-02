import { auth, UserSession } from "@/auth";
import AddButton from "@/components/forms/AddButton";
import { PAGES } from "@/config/pages";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import React from "react";

const GestionImmobilierRightActions = async () => {
    const session = (await auth()) as UserSession;
    const role = session.user.role;
    return (
        <div className="flex justify-end">
            {ACTIONS_CONTROL_PERMISSION.canAction(role) && <AddButton href={PAGES.ADD_PROPERTY} />}
        </div>
    );
};

export default GestionImmobilierRightActions;
