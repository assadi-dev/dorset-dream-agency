import { UseFormReturn } from "react-hook-form";


const isLocation = (propertyService: string) => {
    return propertyService.toLowerCase().includes("location");
}

const isVente = (propertyService: string) => {
    return propertyService.toLowerCase().includes("vente");
}

/**
 * Synchronise le prix en fonction du type de service et de la propriété
 */
export const setPriceSync = (form:UseFormReturn<any>, propertyService: string,propertyOptions:any[]) => {
    if(isLocation(propertyService.toLowerCase())){
        const findProperty = propertyOptions.find((property: any) => property.value === form.getValues("property"));
        if(!findProperty) return;
        form.setValue("price", findProperty?.rentalPrice);
    }
    if(isVente(propertyService.toLowerCase())){
        const findProperty = propertyOptions.find((property: any) => property.value === form.getValues("property"));
        if(!findProperty) return;
        form.setValue("price", findProperty?.sellingPrice);
    }
}


/**
 * Synchronise les infos du client à sa selection
 */
export const setClientSync = (form:UseFormReturn<any>,value:any, clientOptions:any[]) => {
       if (!value && !clientOptions) return;
        const findClient = clientOptions.find((client: any) => client.value === value);

        if (findClient) {
            form.setValue("phone", findClient.phone);
        }
}

/**
 * Synchronise les infos du bien à sa selection
 * Applique le prix en fonction du type de service si le prix n'est pas deja definis
 */
export const setPropertySync = (form:UseFormReturn<any>,value:any, propertyOptions:any[]) => {
       if (!value && !propertyOptions) return;
        const findProperty = propertyOptions.find((property: any) => property.value === value);

        if(findProperty){
            if(form.getValues("propertyService")){
                setPriceSync(form, form.getValues("propertyService"), propertyOptions);
            }
       
        }

}