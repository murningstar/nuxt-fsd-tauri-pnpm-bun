import type { UUID } from 'crypto';
import { usePlatformStore } from '~/entities/platform/infra/platform.store';
import type { SheetModalStackConfig } from '../model/sheet-modal-stack.config';
import type { OpenSheetModalArgs } from './open-sheet-modal';

type ClosingSignal = Ref<boolean>;

export const useSheetModalStackStore = defineStore('sheet-modal-stack-store', () => {
    const { isNativeMobile } = storeToRefs(usePlatformStore());

    const _rootSheetModalStacksConfigs = ref<Map<UUID, [SheetModalStackConfig, ClosingSignal]>>(new Map());

    const _allSheetModalStacksConfigs = ref<Map<UUID, [SheetModalStackConfig, ClosingSignal]>>(new Map());

    const sheetModalStacksConfigs = shallowReadonly(_rootSheetModalStacksConfigs);

    const allSheetModalStacksConfigs = readonly(_allSheetModalStacksConfigs);

    const registerSheetModal = (args: OpenSheetModalArgs) => {
        const { title, description, parentSheetId, contentSlot } = args;

        const id = crypto.randomUUID();

        const closingSignal: ClosingSignal = ref<boolean>(false);

        const config: SheetModalStackConfig = {
            id,
            title,
            description,
            parentId: parentSheetId,
            contentSlot,
            closingSignal,
        };

        const close = () => {
            closingSignal.value = true;
        };

        const register = () => {
            _allSheetModalStacksConfigs.value.set(id, config);

            if (!parentSheetId) {
                _rootSheetModalStacksConfigs.value.set(id, config);

                return;
            }

            const parentConfig = _rootSheetModalStacksConfigs.value.get(parentSheetId);

            if (parentConfig) {
                parentConfig.childConfig = config;
            } else {
                /* TODO здесь костыльная ебатория написана. Пока что работает, но не исключено, что может отвалиться. Немного устал пока что */

                console.error(
                    '[registerSheetModal] Sheet-modal с переданным parentSheetId не найдена. Отображаем её как не nested'
                );
            }
        };

        register();

        return { id, close };
    };

    const unregisterSheetModal = (id: UUID) => {
        const unregister = () => {
            const sheetToUnregister = _allSheetModalStacksConfigs.value.get(id);

            if (!sheetToUnregister) {
                console.error(
                    '[unregisterSheetModal] Ошибка очистки после закрытия sheet-modal. Sheet-modal с переданным id не найдена.'
                );

                return;
            }

            _allSheetModalStacksConfigs.value.delete(id);

            const { parentId } = sheetToUnregister;

            if (!parentId) {
                _rootSheetModalStacksConfigs.value.delete(id);

                return;
            }

            const parentConfig = _rootSheetModalStacksConfigs.value.get(parentId);

            if (!parentConfig) {
                console.error(
                    '[unregisterSheetModal] Ошибка очистки после закрытия sheet-modal. Имеется parentId, но соответствующий конфиг родительской sheet-modal не найден.'
                );
            } else {
                parentConfig.childConfig = undefined;
            }
        };

        unregister();
    };

    const resetModals = () => {
        _rootSheetModalStacksConfigs.value.clear();
        _allSheetModalStacksConfigs.value.clear();
    };

    watch(isNativeMobile, resetModals);

    return {
        sheetModalStacksConfigs,
        allSheetModalStacksConfigs,
        registerSheetModal,
        unregisterSheetModal,
    };
});
