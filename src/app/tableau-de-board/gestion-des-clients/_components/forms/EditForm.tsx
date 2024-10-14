"use client";
import React from "react";
import ClientForm from "./ClientForm";
import { ClientFormType } from "./schema";
import useModalState from "@/hooks/useModalState";
import { updateClient } from "../../actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const EditForm = () => {
    const { payload } = useModalState();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const router = useRouter();

    const defaultValue: ClientFormType = {
        lastName: payload?.lastName || "",
        firstName: payload?.firstName || "",
        phone: payload?.phone,
        gender: payload?.gender || "Male",
    };
    const saveClient = async (values: ClientFormType) => {
        if (!payload?.id) throw new Error("id client undefined");

        await fetch("http://localhost:3000/api/client/" + payload.id, {
            method: "PUT",
            body: JSON.stringify(payload),
        });

        const url = new URLSearchParams(searchParams.toString());
        url.set("id", payload.id);
        router.push(pathname + "?" + url.toString());
        router.refresh();
    };

    return <ClientForm defaultValues={defaultValue} className="w-full lg:w-[28vw] min-h-[420px]" save={saveClient} />;
};

export default EditForm;
