<template>
    <ReusableTemplateDefinition>
        <c-superadmin-panel />

        <nuxt-layout>
            <nuxt-page />
        </nuxt-layout>

        <!-- <template v-for="(ConfirmationDialog, _ix) in confirmationDialogs" :key="_ix">
            <component :is="ConfirmationDialog" />
        </template> -->

        <template v-for="(SheetModal, _ix) in sheetModals" :key="_ix">
            <component :is="SheetModal" />
        </template>
    </ReusableTemplateDefinition>

    <!-- NuxtUI wrapper for everything -->
    <u-app>
        <!-- KonstaUI wrapper for native mobile builds -->
        <k-app v-if="isNativeMobile" :theme="_themeProp">
            <ReusableTemplate />
        </k-app>

        <ReusableTemplate v-else />
    </u-app>
</template>

<script setup lang="ts">
    import { kApp } from 'konsta/vue';
    import { usePlatformStore } from '~/entities/platform/infra/platform.store';
    import { createReusableTemplate } from '@vueuse/core';
    // import { useConfirmationDialogStore } from '~/shared/ui/confirmation-dialog/lib/confirmation-dialog-store';
    import { CSuperadminPanel } from '~/widgets/superadmin-panel';
    import { useSheetModalStore } from '~/shared/ui/sheet-modal/lib/use-sheet-modal-store';

    const [ReusableTemplateDefinition, ReusableTemplate] = createReusableTemplate();

    const { isNativeMobile, currentNativePlatform } = storeToRefs(usePlatformStore());
    // const { confirmationDialogs } = storeToRefs(useConfirmationDialogStore());
    const { sheetModals } = storeToRefs(useSheetModalStore());

    const theme = computed<'ios' | 'material' | null>(() => {
        if (isNativeMobile.value) {
            if (currentNativePlatform.value === 'ios') return 'ios';
            if (currentNativePlatform.value === 'android') return 'material';
        }

        return null;
    });

    const _themeProp = computed<'ios' | 'material' | 'parent'>(() => theme.value ?? 'parent');
</script>
