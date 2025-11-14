import { ZodError } from "zod";
import { messageDB } from "../initialisation";
import { zodParserError } from "@/lib/parser";

export const createMessage = async () => {
    try {
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

export const getMessagesByConversation = async (conversationId: string) => {
    try {
        return new Promise((resolve, reject) => {
            messageDB
                .find({ conversationId })
                .sort({ timestamp: 1 })
                .exec((err, docs) => {
                    if (err) reject(err);
                    else resolve(docs);
                });
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};

export const updateMessage = async () => {
    try {
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};

export const deleteMessage = async () => {
    try {
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};
