"use client"

type CategoriesActionsProps = {
    payload: any;
    canDelete: boolean;
    canUpdate: boolean;
    canUpload: boolean;
};

export default function CategoriesActions({ payload, canDelete, canUpdate, canUpload }: CategoriesActionsProps) {
    return (
        <div>
            <h1>CategoriesAction</h1>
        </div>
    );
}