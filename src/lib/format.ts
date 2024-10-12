export type PluralArg = {
    size: number;
    singular: string;
    plural: string;
};
export const plural = ({ size = 1, singular, plural }: PluralArg) => {
    if (size < 1) throw new Error("size must be equal or gretter than 1");
    if (size === 1) return singular;
    else return plural;
};
/**
 * Force la premiere lettre en majuscule
 * @param word
 */
export const firstLetterCapitalize = (word: string) => {
    if (!word) return;
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export const firstLetterCapitalizeAllWord = (sentence: string) => {
    if (!sentence) return;
    return sentence
        .split(" ")
        .map((word) => firstLetterCapitalize(word))
        .join(" ");
};
