import type { NuxtConfig } from 'nuxt/schema';
import { defu } from 'defu';

const nuxtConfigBase: NuxtConfig = {
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    modules: ['@nuxt/eslint', '@nuxt/hints', '@nuxt/image', '@nuxt/ui'],

    ssr: false, // Disable SSR for Tauri compatibility

    serverDir: './server',

    typescript: {
        strict: true,
        typeCheck: true,
    },

    telemetry: false,
};

/* FSD architecture (Feature Sliced Design) */
const nuxtFSDConfig: NuxtConfig = {
    srcDir: './src', // Используем /src, а не /app, т.к. коллизия имён - в FSD тоже есть папка /app

    alias: {
        '@': '/src',
        '@app': '/src/app',
        '@pages': '/src/pages',
        '@widgets': '/src/widgets',
        '@features': '/src/features',
        '@entities': '/src/entities',
        '@shared': '/src/shared',
    },

    hooks: {
        'app:resolve': app => {
            app.mainComponent = './src/app/entrypoint/app.vue'; // Override the default app.vue location to FSD's app/entrypoint
        },
    },

    dir: {
        layouts: '@/app/layouts',
        plugins: '@/app/plugins',
        middleware: '@/app/middleware',
    },

    /* FSD components auto-imports */
    components: {
        dirs: [
            {
                path: '.',
                pattern: '{shared}/**/ui/*/*.vue',
                prefix: 'c',
                pathPrefix: false,
            },
        ],
    },

    vite: {
        resolve: {
            alias: {
                '@': '/src',
                '@app': '/src/app',
                '@pages': '/src/pages',
                '@widgets': '/src/widgets',
                '@features': '/src/features',
                '@entities': '/src/entities',
                '@shared': '/src/shared',
            },
        },
    },
};

const nuxtTauriAndViteConfig: NuxtConfig = {
    devServer: {
        // Enables the development server to be discoverable by other devices when running on iOS physical devices
        // host: process.env.TAURI_DEV_HOST || '0.0.0.0',
        host: '0.0.0.0',
        port: 1337,
    },

    vite: {
        // Better support for Tauri CLI output
        clearScreen: false,
        // Enable environment variables
        // Additional environment variables can be found at
        // https://v2.tauri.app/reference/environment-variables/
        envPrefix: ['VITE_', 'TAURI_'],
        server: {
            strictPort: true, // Tauri requires a consistent port

            watch: {
                usePolling: true, // Fix file watcher issues on some systems
            },

            // HMR configuration
            // hmr: {
            //     protocol: 'ws',
            //     host: 'localhost',
            //     port: 1337,
            // },
        },
    },

    ignore: ['**/src-tauri/**'], // Prevent watching Tauri files (causes infinite loops)
};

export default defineNuxtConfig(defu(nuxtConfigBase, nuxtFSDConfig, nuxtTauriAndViteConfig));

// const nuxtBunConfig: NuxtConfig = {
/* 
    Bun is not ready to be used in nuxt monorepo - currently it's not possible to use all of it's APIs in dev mode. It can only be used as another folder of monorepo.    
    https://claude.ai/public/artifacts/a388de11-5cad-4c06-b332-1a0c13aefa1b
 */
//     nitro: {
//         preset: 'bun', // Note: This affects standalone server builds, not Tauri's static output
//     },

//     experimental: {
//         asyncContext: true, // Enable experimental async context for Bun compatibility
//     },
// };
