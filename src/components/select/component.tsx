import { useMemo, useState } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import React from 'react';

export interface BaseSelectItem {
    id: string;
    name: string;
    default?: boolean;
}

interface Props<T extends BaseSelectItem> {
    activeItem?: T;
    items: T[];
    placeholder: string;
    onChange: (value: T) => void;
}

const SelectBase = <T extends BaseSelectItem>({ activeItem, items, placeholder, onChange }: Props<T>) => {
    const [opened, setOpened] = useState(false);
    const toggleOpenedState = () => setOpened(!opened);
    const resetOpenedState = () => setOpened(false);

    const onSelect = (item: T) => {
        onChange(item);
        resetOpenedState();
    };

    const listToDisplay = useMemo(
        () =>
            items.filter((item) => {
                if (activeItem) {
                    return item !== activeItem;
                }

                return !item.default;
            }),
        [items, activeItem],
    );

    return (
        <div className={styles.select} onBlur={resetOpenedState} tabIndex={-1}>
            <div
                className={classNames(styles.input, {
                    [styles.input_empty]: !activeItem || activeItem.default,
                    [styles.input_active]: opened,
                })}
                onClick={toggleOpenedState}
            >
                {activeItem?.name ?? placeholder}
            </div>
            {opened && (
                <div className={styles.popup}>
                    <ul className={styles.list}>
                        {listToDisplay.map((item) => {
                            const onClick = () => onSelect(item);

                            return (
                                <li
                                    className={classNames(styles.item, {
                                        [styles.item_active]: item === activeItem,
                                    })}
                                    key={item.id}
                                    onClick={onClick}
                                >
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export const Select = React.memo(SelectBase);
