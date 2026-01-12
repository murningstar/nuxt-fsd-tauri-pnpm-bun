<template>
    <k-card v-if="isNativeMobile" v-bind="$attrs">
        <slot />
    </k-card>

    <u-card v-else :ui="{ body: $attrs.class }">
        <slot />
    </u-card>
</template>

<script setup>
    import { kCard } from 'konsta/vue';
    import { usePlatformStore } from '~/entities/platform';

    const { isNativeMobile } = storeToRefs(usePlatformStore());
</script>

<style lang="scss" scoped></style>
