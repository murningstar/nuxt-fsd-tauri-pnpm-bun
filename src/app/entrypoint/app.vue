<template>
    <DefineTemplate>
        <nuxt-layout>
            <nuxt-page />
        </nuxt-layout>

        <template v-for="(ConfirmationDialog, _ix) in confirmationDialogs" :key="_ix">
            <component :is="ConfirmationDialog" />
        </template>
    </DefineTemplate>

    <!-- KonstaUI wrapper for native mobile builds -->
    <k-app v-if="isNativeMobile" :theme="_themeProp">
        <ReuseTemplate />
    </k-app>

    <!-- NuxtUI wrapper for the rest -->
    <u-app v-else>
        <ReuseTemplate />
    </u-app>

    <pre><code>{{ $device }}</code></pre>
</template>

<script setup lang="ts">
    import { kApp } from 'konsta/vue';
    import { usePlatformStore } from '~/entities/platform/infra/platform.store';
    import { createReusableTemplate } from '@vueuse/core';
    import { useConfirmationDialogStore } from '~/shared/ui/confirmation-dialog/lib/confirmation-dialog-store';

    const [DefineTemplate, ReuseTemplate] = createReusableTemplate();

    const { isNativeMobile, currentNativePlatform } = storeToRefs(usePlatformStore());
    const { confirmationDialogs } = storeToRefs(useConfirmationDialogStore());

    const theme = computed<'ios' | 'material' | null>(() => {
        if (isNativeMobile.value) {
            if (currentNativePlatform.value === 'ios') return 'ios';
            if (currentNativePlatform.value === 'android') return 'material';
        }

        return null;
    });

    const _themeProp = computed<'ios' | 'material' | 'parent'>(() => theme.value ?? 'parent');
</script>
