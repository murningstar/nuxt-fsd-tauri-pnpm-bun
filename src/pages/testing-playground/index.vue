<template>
    <div class="grid grid-cols-3 gap-4 p-4">
        <c-card class="flex flex-col gap-2 text-center">
            <h2 class="text-xl">Sheet modals</h2>
            <div>Opened count: {{ allSheetModalStacksConfigs.size }} {{ sheetModalStacksConfigs.size }}</div>
            <u-button @click="onClickOpenSheetModal"> test sheet modal </u-button>
            <u-button @click="onClickOpenSheetModal2"> test sheet modal 2 </u-button>
        </c-card>
    </div>
</template>

<script setup lang="ts">
    import { UButton } from '#components';
    import { CCard } from '~/shared/ui/card/ui';
    import { openSheetModal } from '~/shared/ui/sheet-modal/lib/open-sheet-modal';
    import { useSheetModalStackStore } from '~/shared/ui/sheet-modal/lib/use-sheet-modal-stack.store';

    const { sheetModalStacksConfigs, allSheetModalStacksConfigs } = storeToRefs(useSheetModalStackStore());

    const onClickOpenSheetModal = () => {
        openSheetModal({
            contentSlot: () => 'some content',
        });
    };

    const onClickOpenSheetModal2 = () => {
        const { id } = openSheetModal({
            title: 'title',
            description: 'description',
            contentSlot: () => [
                'some content',
                h(
                    UButton,
                    {
                        onClick: () => {
                            openSheetModal({
                                contentSlot: () => 'nested sheet',
                                parentSheetId: id,
                            });
                        },
                    },
                    {
                        default: () => 'click me',
                    }
                ),
            ],
        });
    };
</script>

<style scoped></style>
