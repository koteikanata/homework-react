import { useEffect, useRef } from 'react';

export default function useDebouncedCallback<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    delay: number,
    cleanUp = false,
) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    function clearTimer() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    }

    // Очищаем таймер при анмаунте компонента, если cleanUp выставлен в true
    // и тем самым отменяем последний запланированный вызов
    useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

    return (...args: Parameters<T>) => {
        clearTimer();
        timeoutRef.current = setTimeout(() => func(...args), delay);
    };
}
