// /**
//  * Проверяет, включен ли feature flag.
//  * Имя функции `isFeatureEnabled` используется ESLint плагином для отслеживания.
//  *
//  * @param flagName - Имя флага из FeatureFlagName
//  * @returns true - если флаг включен через env переменную
//  */
// export function isFeatureEnabled(flagName: FeatureFlagName): boolean {
//     const config = FEATURE_FLAGS_CONFIG[flagName];

//     if (!config) {
//         console.warn(`[FeatureFlags] Unknown flag: ${flagName}`);
//         return false;
//     }

//     // Получаем значение из Vite env
//     const envValue = import.meta.env[config.envKey];

//     // Считаем флаг включенным если значение 'true' или '1'
//     return envValue === 'true' || envValue === '1';
// }
