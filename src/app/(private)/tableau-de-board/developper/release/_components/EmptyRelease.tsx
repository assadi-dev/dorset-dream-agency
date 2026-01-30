"use client";

import { Folder, FolderArchive, NotebookPen } from "lucide-react";
import React from "react";

const EmptyRelease = () => {
    return (
        <div className="h-[25vh]  flex  justify-center items-center rounded-lg">
            <div className="grid place-items-center text-slate-500">
                <div className="border p-5 bg-secondary rounded-full">
                    {" "}
                    <Folder className="h-14 w-14 " />
                </div>

                <p className=" my-3"> Pas de note de version trouvé</p>
            </div>
        </div>
    );
};

export default EmptyRelease;
