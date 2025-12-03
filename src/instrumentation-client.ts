// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: "https://6f011f40c4f465951be0ad8452cd8bff@o4510468459069440.ingest.de.sentry.io/4510468478730320",

    // Add optional integrations for additional features
    integrations: [Sentry.browserTracingIntegration()],

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,
    // Enable logs to be sent to Sentry
    enableLogs: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
