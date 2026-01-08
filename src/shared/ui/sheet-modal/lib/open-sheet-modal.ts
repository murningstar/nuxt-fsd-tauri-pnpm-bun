import { UDrawer } from '#components';
import { usePlatformStore } from '~/entities/platform';
import { useSheetModalStore } from './use-sheet-modal-store';

/* Типы из примера в https://vuejs.org/api/render-function.html#h (09.06.2025) */

type Children = string | number | boolean | VNode | null | Children[];

type Slot = () => Children;

export type OpenSheetModalArgs = {
    title?: string;
    description?: string;
    isNested?: boolean;
    contentSlot: Slot;
};

export const openSheetModal = (args: OpenSheetModalArgs) => {
    const { title, description, contentSlot, isNested = false } = args;

    const { isAnyDesktop } = storeToRefs(usePlatformStore());
    const { registerSheetModal, unregisterSheetModal } = useSheetModalStore();

    const isModalOpen = ref<boolean>(false);

    const sheetDirection = computed<'bottom' | 'right'>(() => (isAnyDesktop.value ? 'right' : 'bottom'));

    const hasHandle = computed<boolean>(() => !isAnyDesktop.value);

    const hasDescriptionWithoutTitle: boolean = !title && !!description;

    const hasHeader: boolean = !!title && !!description;

    const SheetModal = markRaw(
        defineComponent({
            setup() {
                return () =>
                    h(
                        UDrawer,
                        {
                            open: isModalOpen.value,
                            direction: sheetDirection.value,
                            handle: hasHandle.value,
                            shouldScaleBackground: true,
                            nested: isNested,
                            class: 'min-w-96',

                            'onUpdate:open': isOpen => {
                                if (!isOpen) close();
                            },

                            onAnimationEnd: isOpen => {
                                if (!isOpen) unregisterSheetModal(SheetModal);
                            },
                        },
                        {
                            ...(title
                                ? {
                                      title: () => title,
                                  }
                                : {}),
                            ...(hasDescriptionWithoutTitle
                                ? {
                                      header: () => description,
                                  }
                                : {
                                      description: () => description,
                                  }),
                            ...(hasHeader
                                ? {
                                      body: contentSlot,
                                  }
                                : {
                                      content: contentSlot,
                                  }),
                        }
                    );
            },
        })
    );

    async function open() {
        registerSheetModal(SheetModal);
        isModalOpen.value = true;
    }

    function close() {
        isModalOpen.value = false;
    }

    open();

    return { close };
};
