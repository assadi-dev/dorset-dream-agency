import Sentry from "./sentry";

export const reportException = (error: Error) => {
    console.error(error.message);
    Sentry.captureException(error);
};
