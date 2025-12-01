import { ZodError } from "zod";
import Datastore from "nedb";
import { zodParserError } from "@/lib/parser";
import { InsertMessage, MessageInfer, UpdateMessage } from "./model";
import { AiMessageSchemaInfer } from "./dto/schema";
import { initMessageDatastore } from "../initialisation";

export const createMessage = async (inputs: InsertMessage) => {
    try {
        const messageDB: Datastore<MessageInfer> | undefined = initMessageDatastore();
        if (!messageDB) return;
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

export const getMessagesByConversation = async (
    conversationId: string,
): Promise<AiMessageSchemaInfer[] | undefined> => {
    try {
        const messageDB: Datastore<MessageInfer> | undefined = initMessageDatastore();
        if (!messageDB) return;
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
        const messageDB: Datastore<MessageInfer> | undefined = initMessageDatastore();
        if (!messageDB) return;
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
        const messageDB: Datastore<MessageInfer> | undefined = initMessageDatastore();
        if (!messageDB) return;
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
        const messageDB: Datastore<MessageInfer> | undefined = initMessageDatastore();
        if (!messageDB) return;
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
