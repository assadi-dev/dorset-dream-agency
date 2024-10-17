import { getPropertiesWithVariantsOptions } from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";
import { propertyOptionSchema } from "./schema";

export const GET = async () => {
    try {
        const properties = await getPropertiesWithVariantsOptions();
        const data = properties.map((it) => propertyOptionSchema.parse(it));

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
