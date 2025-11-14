import { ZodError } from "zod";
import { messageDB } from "../initialisation";
import { zodParserError } from "@/lib/parser";
import { InsertMessage, UpdateMessage } from "./model";
import { AiMessageSchemaInfer } from "./dto/schema";

export const createMessage = async (inputs: InsertMessage) => {
    try {
        return new Promise((resolve, reject) => {
            messageDB.insert(inputs, (err, doc) => {
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
            throw error;
        }
    }
};

export const getMessagesByConversation = async (conversationId: string) => {
    try {
        return new Promise((resolve, reject) => {
            messageDB
                .find({ conversationId })
                .sort({ createdAt: 1 })
                .exec((err, docs) => {
                    if (err) reject(err);
                    else resolve(docs);
                });
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw error;
        }
    }
};

export const updateMessage = async (id: string, updates: UpdateMessage) => {
    try {
        return new Promise((resolve, reject) => {
            messageDB.update(
                {
                    _id: id,
                },
                { $set: { ...updates, updateAt: new Date() } },
                {},
                (err, docs) => {
                    if (err) reject(err);
                    else resolve(docs);
                },
            );
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw error;
        }
    }
};

export const deleteMessage = async (id: string) => {
    try {
        return new Promise((resolve, reject) => {
            messageDB.remove({ _id: id }, (err, doc) => {
                if (err) reject(err);
                else resolve(doc);
            });
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw error;
        }
    }
};

export const getOneMessage = async (id: string) => {
    try {
        return new Promise((resolve, reject) => {
            messageDB.remove({ _id: id }, (err, doc) => {
                if (err) reject(err);
                else resolve(doc);
            });
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw error;
        }
    }
};

export const messagesRepository = {
    all: null,
    byConversation: getMessagesByConversation,
    create: createMessage,
    findOne: getOneMessage,
    update: updateMessage,
    delete: deleteMessage,
};
