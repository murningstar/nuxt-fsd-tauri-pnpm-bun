import { kDialog, kDialogButton } from 'konsta/vue';
import { usePlatformStore } from '~/entities/platform/infra/platform.store';
import { useConfirmationDialogStore } from './confirmation-dialog-store';

export type OpenConfirmationDialogArgs = {
    title: string;
    description?: string;
    confirmBtnText?: string;
    cancelBtnText?: string;
    undismissable?: boolean;
    doOnConfirm: (() => Promise<void>) | (() => void);
};

// TODO возможно понадобится доработка / переработка на возврат true/false вместо передачи doOnConfirm
export const openConfirmationDialog = async (args: OpenConfirmationDialogArgs) => {
    const { promise, resolve, reject } = Promise.withResolvers<undefined>();

    const { isNativeMobile } = storeToRefs(usePlatformStore());
    const { registerConfirmationDialog, unregisterConfirmationDialog } = useConfirmationDialogStore();

    const DEFAULT_CONFIRM_BTN_TEXT = 'Confirm'; // TODO i18n
    const DEFAULT_CANCEL_BTN_TEXT = 'Cancel'; // TODO i18n

    const dialogTransitionDuration = 300; // in <k-dialog> there are no lifecycle hooks and no unmount (component is always mounted => only visibility is togglable) and duration is controlled with tailwind's `duration`. Default duration class is `duration-400`

    const isDialogOpen = ref<boolean>(true);

    const isPending = ref<boolean>(false);

    const __isClosing = ref<boolean>(false);

    const areButtonsDisabled = computed<boolean>(() => isPending.value || __isClosing.value);

    const undismissable = computed<boolean>(() => args.undismissable || isPending.value);

    function setPending(_isPending: boolean) {
        isPending.value = _isPending;
    }

    function close() {
        isDialogOpen.value = false;

        setTimeout(() => {
            unregisterConfirmationDialog(Dialog);
        }, dialogTransitionDuration);
    }

    function onConfirmClick() {
        if (areButtonsDisabled.value) return;

        doOnConfirm();
    }

    function onCancelClick() {
        if (areButtonsDisabled.value) return;

        reject();

        close();
    }

    async function doOnConfirm() {
        setPending(true);

        try {
            await args.doOnConfirm();

            setPending(false);

            resolve(undefined);

            close();
        } catch (e) {
            console.error('Error from function passed into confirmation modal', e); // TODO error as result and proper handling OR show negative toast

            setPending(false);
        }
    }

    /* markRaw is needed to mark a vue component so it's never made reactive if it's wrapped with ref/reactive or similar utils */
    const Dialog = markRaw(
        defineComponent({
            setup() {
                return isDialogOpen.value
                    ? () =>
                          isNativeMobile.value
                              ? h(
                                    kDialog,
                                    {
                                        opened: isDialogOpen.value,
                                        backdrop: true,
                                        class: [`duration-${dialogTransitionDuration}`],

                                        onBackdropclick: () => {
                                            if (undismissable.value) return; // TODO trigger animation

                                            reject();

                                            close();
                                        },
                                    },
                                    {
                                        title: () => args.title,
                                        ...(args.description ? { default: () => args.description } : {}),
                                        buttons: () => [
                                            h(
                                                kDialogButton,
                                                {
                                                    disabled: areButtonsDisabled.value,
                                                    onClick: onCancelClick,
                                                },
                                                { default: () => args.cancelBtnText ?? DEFAULT_CANCEL_BTN_TEXT }
                                            ),
                                            h(
                                                kDialogButton,
                                                {
                                                    strong: true,
                                                    disabled: areButtonsDisabled.value,
                                                    onClick: onConfirmClick,
                                                },
                                                {
                                                    default: () => args.confirmBtnText ?? DEFAULT_CONFIRM_BTN_TEXT,
                                                }
                                            ),
                                        ],
                                    }
                                )
                              : h('div')
                    : null;
            },
        })
    );

    registerConfirmationDialog(Dialog);

    return promise;
};
