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
import DeleteTransaction from "./forms/DeleteTransaction";
import { plural } from "@/lib/format";

type SelectionActionButtonProps = {
    selectedItems?: any[];
};

const SelectionActionButton = ({ selectedItems }: SelectionActionButtonProps) => {
    const session = useSession();
    const { data } = session;
    const CAN_DELETE = ACTIONS_CONTROL_PERMISSION.isAdmin(data?.user?.role);
    const { openModal } = useModalState();

    const ids = selectedItems?.map((item) => item?.id);

    const handleClickDelete = () => {
        openModal({
            title: "Suppression des locations - ventes sélectionnée(s)",
            description: `${ids?.length} ${plural(ids?.length, "élément", "éléments")} ${plural(ids?.length, "sélectionné", "sélectionnés")}    `,
            component: DeleteTransaction,
            payload: ids,
        });
    };

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
                        <TextWithTooltip tooltipTitle="Supprimer les éléments sélectionnés">
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

export default SelectionActionButton;
