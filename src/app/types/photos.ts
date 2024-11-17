import { photos } from "@/database/drizzle/schema/photos";

export type PhotoInferType = typeof photos.$inferSelect;

export type PhotoType = Omit<PhotoInferType, "createdAt" | "updatedAt">;
