export const memoize = <T>(getter: () => T): (() => T) => {
    let executed = false;
    let value: T;

    return () => {
        if (!executed) {
            value = getter();
            executed = true;
        }

        return value;
    };
};
