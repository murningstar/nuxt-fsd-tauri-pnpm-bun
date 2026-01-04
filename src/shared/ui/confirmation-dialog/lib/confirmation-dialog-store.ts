import type { Component, Raw } from 'vue';
import { useSettingsStore } from '~/entities/settings/config/settings.store';

export const useConfirmationDialogStore = defineStore('confirmation-dialog-store', () => {
    const { isNativeMobile } = storeToRefs(useSettingsStore());

    const _confirmationDialogs = ref<Raw<Component>[]>([]);
    const confirmationDialogs = shallowReadonly(_confirmationDialogs);

    const registerConfirmationDialog = (confirmationDialog: Raw<Component>) => {
        _confirmationDialogs.value.push(confirmationDialog);
    };

    const unregisterConfirmationDialog = (confirmationDialog: Raw<Component>) => {
        const confirmationDialogIndex = _confirmationDialogs.value.indexOf(confirmationDialog);

        if (confirmationDialogIndex === -1) throw new Error('Системная ошибка закрытия диалогового окна.');

        _confirmationDialogs.value.splice(confirmationDialogIndex, 1);
    };

    const resetDialogs = () => {
        _confirmationDialogs.value = [];
    };

    watch(isNativeMobile, resetDialogs);

    return {
        confirmationDialogs,
        registerConfirmationDialog,
        unregisterConfirmationDialog,
    };
});
