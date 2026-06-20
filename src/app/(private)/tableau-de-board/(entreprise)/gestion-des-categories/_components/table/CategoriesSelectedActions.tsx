"use client"

type CategoriesSelectedActionsProps = {
    itemSelected: any[];
    resetSelectedRow: () => void;
};

export default function CategoriesSelectedActions({ itemSelected, resetSelectedRow }: CategoriesSelectedActionsProps) {
    return (
        <div>
            <h1>CategoriesSelectedActions</h1>
        </div>
    );
}