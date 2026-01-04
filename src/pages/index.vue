<template>
    <div>We are on the root page: `{{ path }}`</div>
</template>

<script setup lang="ts">
    const { path } = toRefs(useRoute());
</script>

<style scoped></style>
