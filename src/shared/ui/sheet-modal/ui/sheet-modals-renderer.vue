<template>
    <template v-for="[_id, sheetModalsStackConfig] of sheetModalStacksConfigs" :key="_id">
        <sheet-modals-stack :config="sheetModalsStackConfig" />
    </template>
</template>

<script setup lang="ts">
    import SheetModalsStack from './sheet-modals-stack.vue';
    import { useSheetModalStackStore } from '../lib/use-sheet-modal-stack.store';

    const { sheetModalStacksConfigs } = storeToRefs(useSheetModalStackStore());
</script>

<style scoped></style>
