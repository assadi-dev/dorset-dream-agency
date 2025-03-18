import { plural } from "./format";

export const selectedLabel = (count?: number) =>
    `${count} ${plural(count, "élément", "éléments")} ${plural(count, "sélectionné", "sélectionnés")}`;
/* 
export const generate_slug = (text: string) => {
    return text.replaceAll(/\s+/g, "_").toLocaleLowerCase();
};
 */
