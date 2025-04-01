export type CustomEventData = {
    detail: any;
};

export const dispatchEvent = (name: string, data: any) => {
    const event = new CustomEvent(name, {
        bubbles: true,
        detail: data,
    });
    window.dispatchEvent(event);
};

export const subscribe = (name: string, callback: (event: unknown) => void) => {
    window.addEventListener(name, callback);
};
export const unsubscribe = (name: string, callback: (event: unknown) => void) => {
    window.removeEventListener(name, callback);
};
