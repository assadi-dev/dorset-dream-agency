import React from "react";

export const useInterval = (callback: () => void, delay?: number) => {
    const saveCallback = React.useRef<() => void>();
    const intervalId = React.useRef<any>(null);

    React.useEffect(() => {
        saveCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        if (!saveCallback.current || !delay) return;
        function tick() {
            if (saveCallback.current) saveCallback.current();
        }
        intervalId.current = setInterval(tick, delay);

        return () => {
            clearInterval(intervalId.current);
        };
    }, [delay]);
};
