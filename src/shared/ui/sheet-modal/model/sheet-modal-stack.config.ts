import type { UUID } from 'crypto';
import type { Slot } from '~/shared/model/vue/slot';

/**
 * Almost always it's just a single sheet-modal.
 * But sometimes nested modals are needed.
 * Well, there are either root sheet-modals or nested sheet-modals.
 */
export type SheetModalStackConfig = {
    id: UUID;
    parentId?: UUID;
    title?: string;
    description?: string;
    contentSlot: Slot;
    /* Прокидывать child в модалку необходимо, чтобы UDrawer находил inject-контекст родительской модалки при использовании `nested`.
    Иначе nested работать не будет. */
    childConfig?: SheetModalStackConfig;
    closingSignal: Ref<boolean>;
};
