import { Message } from "./model";

export const findMessage = async (session: string) => {};

export const insertMessage = async (message: Message) => {};

export const findOrCreateSession = async (session: string, message: Message) => {};

export const deleteConversation = async (session: string) => {};
