<template>
    <u-select-menu v-model="modelValue" :items="platformOptions" class="mx-0 w-full" />
</template>

<script setup lang="ts">
    import { usePlatformStore } from '~/entities/platform/infra/platform.store';
    import type { CurrentNativePlatform } from '~/entities/platform/model';

    // import { isFeatureEnabled } from '~/entities/feature-flags/';
    // const isEnabled = computed(() => isFeatureEnabled('platform-switcher'));

    const platformOptions: { label: string; value: CurrentNativePlatform }[] = [
        { label: 'Windows', value: 'windows' },
        { label: 'Linux', value: 'linux' },
        { label: 'macOS', value: 'macos' },
        { label: 'iOS', value: 'ios' },
        { label: 'Android', value: 'android' },
        { label: 'Web', value: null },
    ];

    const { currentNativePlatform } = storeToRefs(usePlatformStore());
    const { __setCurrentNativePlatform } = usePlatformStore();

    const modelValue = computed({
        get: () => platformOptions.find(({ value }) => currentNativePlatform.value === value),
        set: newOption => __setCurrentNativePlatform(newOption?.value ?? null),
    });
</script>
