export const resetPathname = (url: string) => {
    const parsed = new URL(url);

    parsed.pathname = '/';

    return `/${parsed.search}`;
};

export const addQueryParams = (url: string, params: Record<string, string | undefined>) => {
    const parsed = new URL(url);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            parsed.searchParams.set(key, value);
        } else {
            parsed.searchParams.delete(key);
        }
    });

    return parsed.search;
};
