import { useEffect, useRef, useState } from "react";

export const useDebounce = (value: string | null, timeout: number) => {
    const [debouncedValue, setDebouncedValue] = useState<string | null>(null);
    const timerRef = useRef<any>();

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebouncedValue(value), timeout);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [value, timeout]);

    return {
        debouncedValue,
    };
};
