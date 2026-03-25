"use server";

import { createDecoratorProfile, createDecoratorProfileWithPhoto, updateDecoratorProfile } from "@/database/drizzle/repositories/decoratorProfiles";
import { uploadPhotoDecorator } from "@/database/drizzle/repositories/decoratorProfilesUploadFile";


export const createdecoratorAction = async (formData: FormData)=>{
    const file = formData.get("photo");
    let photoID = null;

    const data = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        speciality: formData.get("speciality") as string,
        experience: formData.get("experience") as string,
        averageTime: formData.get("averageTime") as string,
        photoID: photoID,
    }
  const profile =  await createDecoratorProfile(data)
      if(file instanceof File){
        photoID = await uploadPhotoDecorator({files: [file], decoratorProfileID: profile.id});
    }
}

const updateDecorator = (formData: FormData)=>{
    //updateDecoratorProfile(formData)
}

const deleteDecorator = ()=>{
    //deleteDecoratorProfile()
}

