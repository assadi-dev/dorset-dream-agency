import Datastore from "nedb";
import { ConversationInfer, MessageInfer } from "./chats/model";

export const conversationDB = new Datastore<ConversationInfer>({
    filename: "./saves/conversations.db",
    autoload: true,
    timestampData: true,
});

export const messageDB = new Datastore<MessageInfer>({
    filename: "./saves/messages.db",
    autoload: true,
    timestampData: true,
});

messageDB.ensureIndex({ fieldName: "conversationId" });
