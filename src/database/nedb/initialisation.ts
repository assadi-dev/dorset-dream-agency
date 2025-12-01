import Datastore from "nedb";
import { ConversationInfer, MessageInfer } from "./chats/model";
import path from "path";

const resolvePath = path.resolve();

export const initConversationDatastore = () => {
    try {
        let _conversationDB: Datastore | null = null;
        if (!_conversationDB) {
            _conversationDB = new Datastore<ConversationInfer>({
                filename: path.join(resolvePath, "src", "database", "nedb", "saves", "conversations.db"),
                autoload: true,
                timestampData: true,
            });
        }
        return _conversationDB;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};

export const initMessageDatastore = () => {
    try {
        let _messageDB: Datastore | null = null;
        _messageDB = new Datastore<MessageInfer>({
            filename: path.join(resolvePath, "src", "database", "nedb", "saves", "messages.db"),
            autoload: true,
            timestampData: true,
        });
        return _messageDB;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};
