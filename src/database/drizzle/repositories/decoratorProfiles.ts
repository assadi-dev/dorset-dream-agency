import { db } from "@/database";
import { decoratorProfileInsertEntity, decoratorProfiles } from "../schema/decoratorProfile";
import { sendToUserActions, withPagination } from "./utils/entity";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";
import { BindParameters, FilterPaginationType } from "@/database/types";
import { asc, desc, eq, inArray, like, or, sql } from "drizzle-orm";
import { photos } from "../schema/photos";
import { insertPhoto } from "./photos";



export const createDecoratorProfile = async (inputs: decoratorProfileInsertEntity) => {
    const newDecoratorProfile = await db.insert(decoratorProfiles).values(inputs).$returningId();
    await sendToUserActions({
        message: `Ajout du profil de décorateur ${inputs.firstName} ${inputs.lastName}`,
        action: "create",
        entity: ENTITIES_ENUM.DECORATOR_PROFILES,
        actionName: ACTION_NAMES.decoratorProfiles.create,
    });
    const decoratorProfile = await getOneDecoratorProfile(newDecoratorProfile[0].id);
    return decoratorProfile;
}

export const createDecoratorProfileWithPhoto = async (inputs: decoratorProfileInsertEntity & {photo: number}) => {
    const photo = await insertPhoto(inputs.photo);
    const newDecoratorProfile = await db.insert(decoratorProfiles).values({...inputs, photoID: photo?.id});
    await sendToUserActions({
        message: `Ajout du profil de décorateur ${inputs.firstName} ${inputs.lastName}`,
        action: "create",
        entity: ENTITIES_ENUM.DECORATOR_PROFILES,
        actionName: ACTION_NAMES.decoratorProfiles.create,
    });
    return newDecoratorProfile[0];
}

export const getDecoratorProfileCollections = async (filter: FilterPaginationType) => {
     const { page, limit, order, search } = filter;
     const profilName = sql<string>`CONCAT(${decoratorProfiles.lastName}," ",${decoratorProfiles.firstName})`;
    const query = db.select({
        id: decoratorProfiles.id,
        name: profilName,
        lastName: decoratorProfiles.lastName,
        firstName: decoratorProfiles.firstName,
        phone: decoratorProfiles.phone,
        email: decoratorProfiles.email,
        photoUrl: photos.url,
        photoID: decoratorProfiles.photoID,
        speciality: decoratorProfiles.speciality,
        experience: decoratorProfiles.experience,
        averageTime: decoratorProfiles.averageTime,
        createdAt: decoratorProfiles.createdAt,
      
    }).from(decoratorProfiles).leftJoin(photos, eq(photos.id, decoratorProfiles.photoID)).$dynamic();
            const searchCondition = search
                ? or(
                      like(decoratorProfiles.lastName, sql.placeholder("search")),
                      like(decoratorProfiles.firstName, sql.placeholder("search")),
                      like(decoratorProfiles.email, sql.placeholder("search")),
                      like(decoratorProfiles.speciality, sql.placeholder("search")),
                      like(decoratorProfiles.phone, sql.placeholder("search")),
                      like(decoratorProfiles.experience, sql.placeholder("search")),
                      like(decoratorProfiles.averageTime, sql.placeholder("search")),
             
                  )
                : undefined;
        const parameters: BindParameters = {
            search: `%${search}%`,
        };


        query.where(searchCondition);
        const orderbyColumn = order === "asc" ? asc(decoratorProfiles.createdAt) : desc(decoratorProfiles.createdAt);
        const rowsCount = db.select({ count: sql<number>`COUNT(*)` }).from(decoratorProfiles).where(searchCondition);
        const totalItems = (await rowsCount.execute(parameters))[0].count || 0;
 
        const data = await withPagination(query.$dynamic(), orderbyColumn, page, limit, parameters);
        return {
            page,
            totalItems,
            limit,
            data,
        };
}


export const getOneDecoratorProfile = async (id: number) => {
    const decoratorProfile = await db.select().from(decoratorProfiles).where(eq(decoratorProfiles.id, id));
    return decoratorProfile[0];
}


export const deleteDecoratorProfile = async (id: number) => {
      const decoratorProfile = await getOneDecoratorProfile(id);
        if (!decoratorProfile) throw new Error("decorator profile not found");
  await db.delete(decoratorProfiles).where(eq(decoratorProfiles.id, id));
    await sendToUserActions({
        message: `Suppression du profil de décorateur ${decoratorProfile.firstName} ${decoratorProfile.lastName}`,
        action: "delete",
        entity: ENTITIES_ENUM.DECORATOR_PROFILES,
        actionName: ACTION_NAMES.decoratorProfiles.delete,
    });
    return decoratorProfile;
}


export const deleteMultipleDecoratorProfiles = async (ids: number[]) => {
  await db.delete(decoratorProfiles).where(inArray(decoratorProfiles.id, ids));
    await sendToUserActions({
        message: `Suppression de ${ids.length} profils de décorateurs`,
        action: "delete",
        entity: ENTITIES_ENUM.DECORATOR_PROFILES,
        actionName: ACTION_NAMES.decoratorProfiles.delete,
    });
    return decoratorProfiles;
}


export const updateDecoratorProfile = async (id: number, values: Partial<decoratorProfileInsertEntity>) => {
    const decoratorProfile = await getOneDecoratorProfile(id);
    if (!decoratorProfile) throw new Error("decorator profile not found");
    await db.update(decoratorProfiles).set(values).where(eq(decoratorProfiles.id, id));
    await sendToUserActions({
        message: `Mise à jour du profil de décorateur ${decoratorProfile.firstName} ${decoratorProfile.lastName}`,
        action: "update",
        entity: ENTITIES_ENUM.DECORATOR_PROFILES,
        actionName: ACTION_NAMES.decoratorProfiles.update,
    });
    return decoratorProfile;
}
