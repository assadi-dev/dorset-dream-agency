import { ZodError } from "zod";
import { conversationDB } from "../initialisation";
import { aiConversationSchemaParser } from "./dto/schema";
import { ConversationInfer, InsertConversationInfer } from "./model";
import { zodParserError } from "@/lib/parser";

export const createConversation = ({
    title,
    model,
}: {
    title: string;
    model: string;
}): Promise<ConversationInfer> | undefined => {
    try {
        const result = aiConversationSchemaParser.validate({ title, model });
        if (result.error) throw result.error;
        return new Promise((resolve, reject) => {
            conversationDB.insert(result.data, (err, doc) => {
                if (err) reject(err);
                else resolve(doc);
            });
        });
    } catch (error) {
        if (error instanceof ZodError) {
            const zodErrorData = zodParserError(error);
            console.error(zodErrorData);
        }
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};

export const findConversation = (id: string): Promise<ConversationInfer> | null | undefined => {
    try {
        return new Promise((resolve, reject) => {
            conversationDB.findOne({ _id: id }, (err, doc) => {
                if (err) reject(err);
                else resolve(doc);
            });
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return null;
        }
    }
};

export const updateConversation = async (id: string, updates: Partial<InsertConversationInfer>) => {
    try {
        return new Promise((resolve, reject) => {
            conversationDB.update(
                { _id: id },
                {
                    $set: { ...updates, updatedAt: new Date() },
                },
                {},
                (err, doc) => {
                    if (err) reject(err);
                    else resolve(doc);
                },
            );
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};
export const deleteConversation = async (id: string) => {
    try {
        return new Promise((resolve, reject) => {
            conversationDB.remove({ _id: id }, {}, (err, numRemoved) => {
                if (err) reject(err);
                else resolve(numRemoved);
            });
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};
