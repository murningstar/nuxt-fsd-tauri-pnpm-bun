import { useSheetModalStackStore } from './use-sheet-modal-stack.store';
import type { UUID } from 'crypto';
import type { Slot } from '~/shared/model/vue/slot';

export type OpenSheetModalArgs = {
    title?: string;
    description?: string;
    contentSlot: Slot;
    fullWidthContent?: boolean;
    parentSheetId?: UUID;
};

export const openSheetModal = (args: OpenSheetModalArgs) => {
    const { registerSheetModal } = useSheetModalStackStore();

    const { id, close } = registerSheetModal(args);

    return { id, close };
};
