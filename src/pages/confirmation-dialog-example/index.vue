<template>
    <div class="m-4 border">
        <h1>Page: `{{ path }}`</h1>
        <b class="block">Button is visible when `isNativeMobile === true`</b>
        <button v-if="isNativeMobile" class="border" @click="onClick">Open confirmation</button>
    </div>
</template>

<script setup lang="ts">
    import { usePlatformStore } from '~/entities/platform/infra/platform.store';
    import { openConfirmationDialog } from '~/shared/ui/confirmation-dialog/lib/open-confirmation-dialog';

    const { path } = toRefs(useRoute());

    const { isNativeMobile } = storeToRefs(usePlatformStore());

    const onClick = () => {
        openConfirmationDialog({
            title: 'Загловок',
            description: 'Описание',
            doOnConfirm: () =>
                openConfirmationDialog({
                    title: 'Загловок глубже',
                    description: 'Описание глубже',
                    doOnConfirm: () => {
                        alert(`let's GO`);
                    },
                    confirmBtnText: 'Подверди глубже',
                    cancelBtnText: 'Отминет глубже',
                }),
            confirmBtnText: 'Подверди',
            cancelBtnText: 'Отминет',
        });
    };
</script>

<style scoped></style>
