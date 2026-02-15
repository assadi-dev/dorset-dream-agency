import { getApplyPrice, isLocation, isVente } from "@/lib/calculatePrice";
import { UseFormReturn } from "react-hook-form";



/**
 * Synchronise le prix en fonction du type de service et de la propriété
 */
export const setPriceSync = (form:UseFormReturn<any>, propertyService: string,propertyOptions:any[]) => {
    const typePropertyService = propertyService.toLowerCase();
  
    if(isLocation(typePropertyService)){
        const findProperty = propertyOptions.find((property: any) => property.value === form.getValues("property"));
        if(!findProperty) return;

          const applyPrice = getApplyPrice(typePropertyService,findProperty?.rentalPrice);
        form.setValue("price", applyPrice);
    }
    if(isVente(typePropertyService)){
        const findProperty = propertyOptions.find((property: any) => property.value === form.getValues("property"));
        if(!findProperty) return;

          const applyPrice = getApplyPrice(typePropertyService,findProperty?.sellingPrice);
        form.setValue("price", applyPrice);
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