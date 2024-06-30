type Item = {
    id: string;
    name: string;
    default?: boolean;
};

const DEFAULT_ITEM_KEY = '0';

export const transformConstantsToArray = (obj: Record<string, string>) => {
    const arr: Item[] = [];

    Object.entries(obj).forEach(([key, value]) => {
        arr.push({
            id: key,
            name: value,
            default: key === DEFAULT_ITEM_KEY,
        });
    });

    return arr;
};

export const transformConstantsToHash = (obj: Record<string, string>) => {
    const hash: Record<string, Item> = {};

    Object.entries(obj).forEach(([key, value]) => {
        hash[key] = {
            id: key,
            name: value,
            default: key === DEFAULT_ITEM_KEY,
        };
    });

    return hash;
};
