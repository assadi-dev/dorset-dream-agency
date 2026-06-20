"use client"

type TaxesSelectedActionsProps = {
    itemSelected: any[];
    resetSelectedRow: () => void;
};

export default function TaxesSelectedActions({ itemSelected, resetSelectedRow }: TaxesSelectedActionsProps) {
    return (
        <div>
            <h1>TaxesSelectedActions</h1>
        </div>
    );
}