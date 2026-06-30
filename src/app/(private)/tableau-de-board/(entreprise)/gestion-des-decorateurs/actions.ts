"use server";

import { createDecoratorProfile, createDecoratorProfileWithPhoto, deleteMultipleDecoratorProfiles, updateDecoratorProfile } from "@/database/drizzle/repositories/decoratorProfiles";
import { shouldRemovePhotoDecorator, uploadPhotoDecorator } from "@/database/drizzle/repositories/decoratorProfilesUploadFile";
import { revalidatePath } from "next/cache";

const PATH_DECORATOR = "/tableau-de-board/gestion-des-decorateurs";

export const createdecoratorAction = async (formData: FormData)=>{
    const file = formData.get("photo");
    const data = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        speciality: formData.get("speciality") as string,
        experience: formData.get("experience") as string,
        averageTime: formData.get("averageTime") as string,
   
    }
    
  const profile =  await createDecoratorProfile(data)
      if(file instanceof File){
       await uploadPhotoDecorator({files: [file], decoratorProfileID: profile.id});
    }
    revalidatePath(PATH_DECORATOR);
}

export const updateDecoratorAction = async (formData: FormData)=>{
      const file = formData.get("photo");
      const id = Number(formData.get("id")) ;
      const photoID = Number(formData.get("photoID")) ;
      const data = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        speciality: formData.get("speciality") as string,
        experience: formData.get("experience") as string,
        averageTime: formData.get("averageTime") as string,
   
    }
   const profile = await updateDecoratorProfile(id, data)
   if(file instanceof File){
    if(photoID){
        await shouldRemovePhotoDecorator({photoID});
    }
    await uploadPhotoDecorator({files: [file], decoratorProfileID: profile.id});
 }
 revalidatePath(PATH_DECORATOR);
}

export const deleteDecorator =async (ids:number[])=>{
    await deleteMultipleDecoratorProfiles(ids)
    revalidatePath(PATH_DECORATOR);
}

