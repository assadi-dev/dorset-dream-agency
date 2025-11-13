import { LLmRole } from "@/app/api/ai-actions/types/type";

export type Message = {
    id: string;
    role: LLmRole;
    content: string;
    timestamp: Date;
};

export type Conversation = [{ session: string; history: Message[] }];
