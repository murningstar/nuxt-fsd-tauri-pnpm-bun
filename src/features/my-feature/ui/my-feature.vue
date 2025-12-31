<template>
    <div>
        <h2>my-feature</h2>
    </div>
</template>

<script setup lang="ts">
    onMounted(async () => {
        const res = await $fetch('/');

        console.log(res);
    });
</script>

<style scoped></style>
