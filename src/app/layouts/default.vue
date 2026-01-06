<template>
    <div>
        <header class="relative mb-2 flex flex-col gap-2 border px-6 py-4 shadow-xl">
            <div clas>Header: Default layout</div>
            <div class="flex gap-2">
                <div class="inline-block border">
                    <div>We're on the page:</div>
                    <div>
                        Name: <code>{{ $route.name }}</code>
                    </div>
                    <div>
                        Path: <code>{{ $route.path }}</code>
                    </div>
                </div>
            </div>

            <div class="inline-flex gap-2">
                <nuxt-link
                    v-for="{ name, path } in router.options.routes"
                    :key="name"
                    :to="path"
                    class="self-start border px-2 py-0.5"
                >
                    to {{ name }}
                </nuxt-link>
            </div>
        </header>

        <main class="m-4 border-2">
            <slot />
        </main>

        <footer>footer</footer>
    </div>
</template>

<script setup lang="ts">
    const router = useRouter();
</script>
