import { FieldSchemaInfer } from "./_components/schema";

export const RELEASE_FIELD_MOCK = {
    id: "123456",
    name: "✨ Nouvelles fonctionnalités",
    value: "- Ajout de l'action dupliquer dans la page gestion des biens immobiliers \n - Affichage des variantes au clique sur les noms de biens immo ",
};

export const fetchRelease = async () => {
    const request = await fetch("/api/release/version");
    const json = await request.json();
    if (!request.ok) throw json;
    return json as { name: string; version: string; release: Omit<FieldSchemaInfer, "id">[] };
};

export const updateVersionApi = async (data: { version: string }) => {
    try {
        const request = await fetch("/api/release/version", {
            method: "POST",
            body: JSON.stringify(data),
        });
        const json = await request.json();
        if (!request.ok) throw json;
        return json;
    } catch (error) {
        throw error;
    }
};
export const updateVersionFieldsApi = async (data: { fields: { name: string; value: string }[] }) => {
    try {
        const request = await fetch("/api/release/generate", {
            method: "POST",
            body: JSON.stringify(data),
        });
        const json = await request.json();
        if (!request.ok) throw json;
        return json;
    } catch (error) {
        throw error;
    }
};
