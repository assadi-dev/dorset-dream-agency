"use server";

import { createDecoratorProfile, createDecoratorProfileWithPhoto, deleteMultipleDecoratorProfiles, updateDecoratorProfile } from "@/database/drizzle/repositories/decoratorProfiles";
import { uploadPhotoDecorator } from "@/database/drizzle/repositories/decoratorProfilesUploadFile";


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
}

export const updateDecoratorAction = async (formData: FormData)=>{
      const file = formData.get("photo");
      const id = Number(formData.get("id")) ;
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
    await uploadPhotoDecorator({files: [file], decoratorProfileID: profile.id});
 }
}

export const deleteDecorator =async (ids:number[])=>{
    await deleteMultipleDecoratorProfiles(ids)
}

