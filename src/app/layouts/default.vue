<template>
    <div>
        <header class="flex gap-2">
            <div>LOGO | default layout</div>

            <nuxt-link
                v-for="{ name, path } in router.options.routes"
                :key="name"
                :to="path"
                class="border px-2 py-0.5"
            >
                {{ name }}
            </nuxt-link>
        </header>

        <main>
            <slot />
        </main>

        <footer>footer</footer>
    </div>
</template>

<script setup lang="ts">
    const router = useRouter();
</script>
