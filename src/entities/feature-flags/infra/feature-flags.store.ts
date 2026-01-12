// import { isFeatureEnabled } from '../lib/is-feature-enabled';

// export const useFeatureFlagsStore = defineStore('feature-flags', () => {
//     const flags = computed(() => {
//         const result = {} as Record<FeatureFlagName, boolean>;

//         for (const flagName of FEATURE_FLAG_NAMES) {
//             result[flagName] = isFeatureEnabled(flagName);
//         }

//         return result;
//     });

//     const flagsConfig = readonly(FEATURE_FLAGS_CONFIG);

//     const isFlagEnabled = (flagName: FeatureFlagName): boolean => {
//         return flags.value[flagName] ?? false;
//     };

//     const debugInfo = computed(() => {
//         return FEATURE_FLAG_NAMES.map(name => ({
//             name,
//             enabled: flags.value[name],
//             ...FEATURE_FLAGS_CONFIG[name],
//         }));
//     });

//     return {
//         flags,
//         flagsConfig,
//         isFlagEnabled,
//         debugInfo,
//     };
// });
