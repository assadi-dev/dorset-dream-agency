import Sentry from "./sentry";

export const captureException = (error: Error) => {
    console.error(error.message);
    Sentry.captureException(error);
};
