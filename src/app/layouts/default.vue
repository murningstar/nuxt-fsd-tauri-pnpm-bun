<template>
    <div>
        <header>
            <div class="flex gap-2">
                <div>Default layout</div>

                <div class="border inline-block">
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
                    class="border px-2 py-0.5 self-start"
                >
                    to {{ name }}
                </nuxt-link>
            </div>
        </header>

        <main class="border-2 m-4">
            <slot />
        </main>

        <footer>footer</footer>
    </div>
</template>

<script setup lang="ts">
    const router = useRouter();
</script>
