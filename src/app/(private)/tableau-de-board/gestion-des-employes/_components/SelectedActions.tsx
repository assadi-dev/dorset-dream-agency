import React from "react";
import ButtonActionWithTooltip from "@/components/Buttons/ButtonActionWithTooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import TextWithTooltip from "@/components/Text/TextWithTooltip";
import useModalState from "@/hooks/useModalState";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import { useSession } from "next-auth/react";
import { FORBIDDEN_ACTION } from "@/config/messages";

import { selectedLabel } from "@/lib/text";
import DeleteForm from "./forms/DeleteForm";
import { SelectionAction } from "@/app/types/generic";

type SelectionActionButtonProps = SelectionAction;

const SelectionActions = ({ selectedItems, resetSelected }: SelectionActionButtonProps) => {
    const session = useSession();
    const { data } = session;
    const CAN_DELETE = ACTIONS_CONTROL_PERMISSION.canAction(data?.user?.role);
    const { openModal } = useModalState();

    const ids = selectedItems?.map((item) => item?.id);

    const handleClickDelete = () => {
        if (!CAN_DELETE) throw new Error(FORBIDDEN_ACTION);
        openModal({
            title: "Supprimer un Employé",
            description: selectedLabel(ids?.length),
            component: DeleteForm,
            payload: { ids, resetSelected },
        });
    };

    const TOOLTIP_MESSAGE = CAN_DELETE ? "Supprimer les éléments sélectionnés" : FORBIDDEN_ACTION;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button size={"sm"} variant={"outline"}>
                        Actions
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleClickDelete} disabled={!CAN_DELETE}>
                        <TextWithTooltip tooltipTitle={TOOLTIP_MESSAGE}>
                            {" "}
                            <p className="flex gap-2 items-center">
                                {" "}
                                <Trash2 width={"1rem"} height={"1rem"} /> Supprimer
                            </p>
                        </TextWithTooltip>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default SelectionActions;
