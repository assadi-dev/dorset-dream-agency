import type { AligningLineConfig } from "./typedefs";

export const aligningLineConfig: AligningLineConfig = {
    /** At what distance from the shape does alignment begin? */
    margin: 4,
    /** Aligning line dimensions */
    width: 1,
    /** Aligning line color */
    color: "rgba(255,0,0,0.8)",
    /** Close Vertical line, default false. */
    closeVLine: false,
    /** Close horizontal line, default false. */
    closeHLine: false,
};
