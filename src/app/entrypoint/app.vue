<template>
    <ReusableTemplateDefinition>
        <nuxt-layout>
            <nuxt-page :keepalive="pagesHaveKeepAlive" :transition="pagesHaveTransitions" />
        </nuxt-layout>

        <c-sheet-modals-renderer />

        <c-superadmin-panel />
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
    import { CSuperadminPanel } from '~/widgets/superadmin-panel';
    import { CSheetModalsRenderer } from '~/shared/ui/sheet-modal';

    const [ReusableTemplateDefinition, ReusableTemplate] = createReusableTemplate();

    const { isNativeMobile, currentNativePlatform, isAnyMobile } = storeToRefs(usePlatformStore());
    // const { confirmationDialogs } = storeToRefs(useConfirmationDialogStore());

    const pagesHaveKeepAlive = computed<boolean>(() => isAnyMobile.value);
    const pagesHaveTransitions = computed<boolean>(() => isAnyMobile.value);

    const theme = computed<'ios' | 'material' | null>(() => {
        if (isNativeMobile.value) {
            if (currentNativePlatform.value === 'ios') return 'ios';
            if (currentNativePlatform.value === 'android') return 'material';
        }

        return null;
    });

    const _themeProp = computed<'ios' | 'material' | 'parent'>(() => theme.value ?? 'parent');
</script>
