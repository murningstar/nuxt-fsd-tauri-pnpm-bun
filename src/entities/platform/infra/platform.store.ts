import { platform as getPlatform, type Platform as NativePlatform } from '@tauri-apps/plugin-os';

export const usePlatformStore = defineStore('platform', () => {
    const currentNativePlatform = ref<NativePlatform | null>(null);
    const { isMobile, isDesktop } = useDevice();

    try {
        currentNativePlatform.value = getPlatform();
    } catch {
        console.info('App is not in native mode');
    }

    const isNativePlatform = computed<boolean>(() => !!currentNativePlatform.value);

    const isNativeMobile = computed<boolean>(
        () => isNativePlatform.value && ['ios', 'android'].includes(currentNativePlatform.value ?? '')
    );

    const isNativeDesktop = computed<boolean>(
        () => isNativePlatform.value && ['windows', 'linux', 'macos'].includes(currentNativePlatform.value ?? '')
    );

    const isWebBrowser = computed<boolean>(() => !isNativePlatform.value);

    const isWebMobile = computed<boolean>(() => isWebBrowser.value && isMobile);

    const isWebDesktop = computed<boolean>(() => isWebBrowser.value && isDesktop);

    const isAnyMobile = computed<boolean>(() => isNativeMobile.value || isWebMobile.value);

    const isAnyDesktop = computed<boolean>(() => isNativeDesktop.value || isWebDesktop.value);

    return {
        currentNativePlatform,
        isNativePlatform,
        isNativeMobile,
        isNativeDesktop,
        isWebBrowser,
        isWebMobile,
        isWebDesktop,
        isAnyMobile,
        isAnyDesktop,
    };
});
