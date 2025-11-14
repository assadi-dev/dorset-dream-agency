import Datastore from "nedb";
import { ConversationInfer, MessageInfer } from "./chats/model";
import path from "path";

const resolvePath = path.resolve();
export const conversationDB = new Datastore<ConversationInfer>({
    filename: path.join(resolvePath, "src", "database", "nedb", "saves", "conversations.db"),
    autoload: true,
    timestampData: true,
});

export const messageDB = new Datastore<MessageInfer>({
    filename: path.join(resolvePath, "src", "database", "nedb", "saves", "messages.db"),
    autoload: true,
    timestampData: true,
});

messageDB.ensureIndex({ fieldName: "conversationId" });
