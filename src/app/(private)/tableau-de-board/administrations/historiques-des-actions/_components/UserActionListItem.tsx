"use client";
import { Button } from "@/components/ui/button";
import React from "react";

type userActionListItem = {
    action: any;
};
const UserActionListItem = ({ action }: userActionListItem) => {
    return (
        <div>
            <div className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-start">
                <div>
                    {/* Nom et type d'action */}
                    <h2 className="text-lg font-semibold">{action.user}</h2>
                    <p className={`text-sm ${action.action === "Suppression" ? "text-red-600" : "text-blue-600"}`}>
                        {action.action === "Suppression" ? "Suppression" : "Modification"}
                    </p>

                    {/* Détails de l'action */}
                    <p className="text-sm mt-2">Détails : {action.details}</p>
                    <p className="text-sm text-gray-500">Date : {action.date}</p>
                </div>

                {/* Boutons d'actions */}
                <div className="flex flex-col space-y-2">
                    <Button className="mr-2">Voir Détails</Button>
                    {action.action === "Suppression" && <Button variant="destructive">Annuler</Button>}
                </div>
            </div>
        </div>
    );
};

export default UserActionListItem;
