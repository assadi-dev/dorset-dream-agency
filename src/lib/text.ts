import { plural } from "./format";

export const selectedLabel = (count?: number) =>
    `${count} ${plural(count, "élément", "éléments")} ${plural(count, "sélectionné", "sélectionnés")}`;
