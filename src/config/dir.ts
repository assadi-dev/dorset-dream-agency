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

/**
 * Emplacement du dossier de stockage pour les photos de type properties
 */
export const UPLOAD_DIR_PROPERTIES = path.join(ENV.STORAGE_DIR, "images", "properties");
/**
 * Emplacement du dossier de stockage pour les photos de type perquisitions
 */
export const UPLOAD_DIR_PERQUISITION = path.join(ENV.STORAGE_DIR, "images", "perquisitions");
/**
 * Emplacement du dossier de stockage pour les images
 */
export const UPLOAD_DIR_IMAGES = path.join(ENV.STORAGE_DIR, "images");
/**
 * Emplacement du dossier de stockage pour les images d’arrière plans pour l’éditeur des annonces
 */
export const BACKGROUND_DIR_IMAGES = path.join(ENV.STORAGE_DIR, "images", "backgrounds");
