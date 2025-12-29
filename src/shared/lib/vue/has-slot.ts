export const hasSlot = (name: string) => {
    const slots = useSlots();

    if (name === '') {
        const defaultSlot = slots.default?.();

        return defaultSlot?.length === 1;
    }

    return !!slots[name];
};
