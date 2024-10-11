import { propertySchema } from "../../_components/form/propertySchema";

export const createPropertyDto = (values: unknown) => propertySchema.safeParseAsync(values);
