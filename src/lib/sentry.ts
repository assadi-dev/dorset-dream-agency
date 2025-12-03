import * as Sentry from "@sentry/nextjs";

export default Sentry;

export const sentrySpy = (name: string, callback: () => any) => {
    Sentry.startSpan({ name }, callback);
};

export class SentryCustomError extends Error {
    constructor(name: string | "SentryCustomError", message: string | undefined) {
        super(message);
        this.name = name;
    }
}
