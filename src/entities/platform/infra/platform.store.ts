import { platform as getPlatform, type Platform as NativePlatform } from '@tauri-apps/plugin-os';

export const usePlatformStore = defineStore('platform', () => {
    const _device = useDevice();
    const currentNativePlatform = ref<NativePlatform | null>(null);

    try {
        currentNativePlatform.value = getPlatform();
    } catch {
        console.info('App is not in native mode');
    }

    const isNativePlatform = computed<boolean>(() => !!currentNativePlatform.value);

    const isWebBrowser = computed<boolean>(() => !isNativePlatform.value);

    const isNativeMobile = computed<boolean>(
        () => isNativePlatform.value && ['ios', 'android'].includes(currentNativePlatform.value ?? '')
    );

    return {
        currentNativePlatform,
        isNativePlatform,
        isNativeMobile,
        isWebBrowser,
    };
});
