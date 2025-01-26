import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import UserActionListItem from "./UserActionListItem";

const UserActionsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const actions = [
        { user: "Alice", action: "Modification", details: "Modifié email", date: "2025-01-25" },
        { user: "Bob", action: "Suppression", details: "Supprimé compte", date: "2025-01-22" },
        // Liste d'actions d'exemple
    ];

    return (
        <div className="container mx-auto p-6">
            {/* Tableau */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2">Utilisateur</th>
                            <th className="px-4 py-2">Action</th>
                            <th className="px-4 py-2">Détails</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actions
                            .filter((action) => action.user.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((action, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{action.user}</td>
                                    <td className="px-4 py-2">{action.action}</td>
                                    <td className="px-4 py-2">{action.details}</td>
                                    <td className="px-4 py-2">{action.date}</td>
                                    <td className="px-4 py-2">
                                        <Button className="mr-2">Détails</Button>
                                        <Button variant="destructive">Annuler</Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserActionsPage;
