<template>
    <DefineTemplate>
        <nuxt-layout>
            <nuxt-page />
        </nuxt-layout>
    </DefineTemplate>

    <button class="border" @click="__toggleIsNativeMobile">Toggle native mode</button>
    <div>isNativeMobile: {{ isNativeMobile }}</div>

    <!-- KonstaUI wrapper for native mobile builds -->
    <k-app v-if="isNativeMobile">
        <ReuseTemplate />
    </k-app>

    <!-- NuxtUI wrapper for the rest -->
    <u-app v-else>
        <ReuseTemplate />
    </u-app>
</template>

<script setup lang="ts">
    import { kApp } from 'konsta/vue';
    import { useSettingsStore } from '~/entities/settings/config/settings.store';
    import { createReusableTemplate } from '@vueuse/core';

    const [DefineTemplate, ReuseTemplate] = createReusableTemplate();

    const { isNativeMobile } = storeToRefs(useSettingsStore());
    const { __toggleIsNativeMobile } = useSettingsStore();
</script>
