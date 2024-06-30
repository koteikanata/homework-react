type Timeout = ReturnType<typeof setTimeout>;

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    delay: number,
): ((...args: Parameters<F>) => () => void) => {
    let timeout: Timeout;

    return (...args: Parameters<F>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);

        return () => {
            clearTimeout(timeout);
        };
    };
};
