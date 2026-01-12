interface FeatureFlagMeta {
    /** Дата истечения в формате YYYY-MM-DD или null для постоянных флагов */
    expires: string | null;
    /** Описание назначения флага */
    description?: string;
    /** ENV переменная для активации флага */
    envKey: `VITE_FEATURE_${string}`;
}

/**
 * Единый source of truth для всех feature flags.
 *
 * При добавлении нового флага - добавь его только сюда.
 * vite-env.d.ts генерируется автоматически из этого конфига.
 */

export const featureFlagsConfig = {
    'platform-switcher': {
        expires: null,
        description: 'Platform switcher for development mode - allows switching native platform emulation',
        envKey: 'VITE_FEATURE_PLATFORM_SWITCHER',
    },
    'superadmin-panel': {
        expires: null,
        envKey: 'VITE_FEATURE_SUPERADMIN_PANEL',
    },
} satisfies { [featureFlagName: string]: FeatureFlagMeta };

export type FeatureFlagName = keyof typeof featureFlagsConfig;
