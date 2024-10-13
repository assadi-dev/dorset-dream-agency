import path from "path";
import { ENV } from "./global";

/**
 * Dossier de l'Emplacement des images concernant les propriétés
 */
export const PROPERTIES_DIR = path.join(ENV.STORAGE_DIR, "images", "properties");

/**
 * Dossier de l'Emplacement des images concernant les avatars
 */
export const AVATARS_DIR = path.join(ENV.STORAGE_DIR, "images", "avatars");
