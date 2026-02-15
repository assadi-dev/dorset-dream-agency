export const APPLY_PRICE_OPTIONS = {
    "blaine_county": {
        name:"Blaine County",
        percentage: -20
    }
}


export const isLocation = (propertyService: string) => {
    return propertyService.toLowerCase().includes("location");
}

export const applyPercentage = (price:number,percentage:number) => {
    const finalPrice = price * (1 + percentage / 100);
    return Number(finalPrice.toFixed(0));
}

export const isVente = (propertyService: string) => {
    return propertyService.toLowerCase().includes("vente");
}

export const getApplyPrice = (typePropertyService: string,price:number) => {
    if(typePropertyService.toLowerCase().includes(APPLY_PRICE_OPTIONS.blaine_county.name.toLowerCase())){
        return applyPercentage(price,APPLY_PRICE_OPTIONS.blaine_county.percentage);
    }
    return price;
}
