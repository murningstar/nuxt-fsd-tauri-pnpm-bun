import type { Component, Raw } from 'vue';
import { usePlatformStore } from '~/entities/platform/infra/platform.store';

export const useSheetModalStore = defineStore('sheet-modal-store', () => {
    const { isNativeMobile } = storeToRefs(usePlatformStore());

    const _sheetModals = ref<Raw<Component>[]>([]);
    const sheetModals = shallowReadonly(_sheetModals);

    const registerSheetModal = async (sheetModal: Raw<Component>) => {
        _sheetModals.value.push(sheetModal);

        const { promise, resolve } = Promise.withResolvers();

        nextTick(() => resolve(undefined));

        return promise;
    };

    const unregisterSheetModal = async (sheetModal: Raw<Component>) => {
        const sheetModalIndex = _sheetModals.value.indexOf(sheetModal);

        if (sheetModalIndex === -1) throw new Error('Системная ошибка закрытия sheet modal.');

        const { promise, resolve } = Promise.withResolvers();

        _sheetModals.value.splice(sheetModalIndex, 1);

        nextTick(() => resolve(undefined));

        return promise;
    };

    const resetModals = () => {
        _sheetModals.value = [];
    };

    watch(isNativeMobile, resetModals);

    return {
        sheetModals,
        registerSheetModal,
        unregisterSheetModal,
    };
});
