<template>
    <div class="flex min-h-screen flex-col" data-vaul-drawer-wrapper>
        <header class="relative mb-2 flex flex-col gap-2 px-6 py-4 shadow-xl">
            <div
                class="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 text-5xl font-semibold text-nowrap opacity-15"
            >
                Header: Default layout
            </div>
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

        <main class="p-4">
            <slot />
        </main>

        <footer class="mt-auto border-t">footer</footer>
    </div>
</template>

<script setup lang="ts">
    const router = useRouter();
</script>
