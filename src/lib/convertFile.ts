export const toBase64 = (file: File): Promise<string | unknown> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject("");
    });
export const toBase64FromUrl = async (url: string): Promise<string | unknown> => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject("");
    });
};

type ConvertUrlToFileArg = {
    name: string;
    url: string;
    mimetype: string;
};
/**
 * Conversion en fichier spécifique au mimetype à partir de l'url
 * @param {ConvertUrlToFileArg} args Arguments à passé pour la conversion
 * @param {string} args.url - url du fichier
 * @param {string} args.mimetype - type de fichier à généré exemple: image/png, video/mp4
 */
export const convertUrlToFile = async ({ name, url, mimetype }: ConvertUrlToFileArg): Promise<File> => {
    const res = await fetch(url);

    if (!res.ok) throw new Error("Erreur lors du fetch de l'URL");
    const buffer = await res.arrayBuffer();
    const file = new File([buffer], name, { type: mimetype });
    return file;
};

type ConvertBlobToFileArg = {
    name: string;
    blob: Blob;
    mimetype: string;
};
/**
 * Conversion en fichier spécifique au mimetype à partir de l'url
 * @param {ConvertBlobToFileArg} args Arguments à passé pour la conversion
 * @param {string} args.name - Nom du fichier
 * @param {string} args.mimetype - type de fichier à généré exemple: ```image/png```, ```video/mp4```, ```image/svg+xml```
 */
export const convertBlobToFile = async ({ name, blob, mimetype }: ConvertBlobToFileArg): Promise<File> => {
    const buffer = await blob.arrayBuffer();
    const file = new File([buffer], name, { type: mimetype });
    return file;
};

type base64FileName = { base64: string; mimetype: string; fileName: string };

export const base64ToFile = async ({ base64, mimetype, fileName }: base64FileName) => {};
