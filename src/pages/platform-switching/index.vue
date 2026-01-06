<template>
    <div>
        <button
            v-for="{ label, value } in platformOptions"
            :key="label"
            class="border p-1 m-1"
            @click="() => onOptionClick(value)"
        >
            {{ label }}
        </button>
    </div>
</template>

<script setup lang="ts">
    import { usePlatformStore } from '~/entities/platform/infra/platform.store';
    import type { CurrentNativePlatform } from '~/entities/platform/model';

    const { __setCurrentNativePlatform } = usePlatformStore();

    const platformOptions: { label: string; value: CurrentNativePlatform }[] = [
        { value: 'windows', label: 'windows' },
        { value: 'linux', label: 'linux' },
        { value: 'macos', label: 'macos' },
        { value: 'ios', label: 'ios' },
        { value: 'android', label: 'android' },
        { value: null, label: 'NOT NATIVE' },
    ];

    const onOptionClick = (currentNativePlatform: CurrentNativePlatform) => {
        __setCurrentNativePlatform(currentNativePlatform);
    };
</script>

<style scoped></style>
