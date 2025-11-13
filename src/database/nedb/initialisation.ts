import Datastore from "nedb-promises";

export const conversationDB = Datastore.create({
    filename: "./saves/conversations.db",
    autoload: true,
});
