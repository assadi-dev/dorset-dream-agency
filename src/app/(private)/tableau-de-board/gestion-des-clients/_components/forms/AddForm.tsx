import React from "react";
import ClientForm from "./ClientForm";
import { ClientFormType } from "./schema";
import { insertClient } from "../../actions";
import { usePathname, useRouter } from "next/navigation";

const AddForm = () => {
    const pathname = usePathname();
    const router = useRouter();

    const createClient = async (values: ClientFormType) => {
        await insertClient(values);
        router.push(pathname);
        router.refresh();
    };

    return <ClientForm save={createClient} className="w-full lg:w-[28vw] min-h-[420px]" />;
};

export default AddForm;
