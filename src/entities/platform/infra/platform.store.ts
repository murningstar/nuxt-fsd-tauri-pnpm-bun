import { platform as getPlatform } from '@tauri-apps/plugin-os';
import type { CurrentNativePlatform } from '../model';

export const usePlatformStore = defineStore('platform', () => {
    const _currentNativePlatform = ref<CurrentNativePlatform>(null);
    const { isMobile, isDesktop } = useDevice();

    try {
        _currentNativePlatform.value = getPlatform();
    } catch {
        console.info('App is not in native mode');
    }

    const currentNativePlatform = readonly(_currentNativePlatform);

    const isNativePlatform = computed<boolean>(() => !!_currentNativePlatform.value);

    const isNativeMobile = computed<boolean>(
        () => isNativePlatform.value && ['ios', 'android'].includes(_currentNativePlatform.value ?? '')
    );

    const isNativeDesktop = computed<boolean>(
        () => isNativePlatform.value && ['windows', 'linux', 'macos'].includes(_currentNativePlatform.value ?? '')
    );

    const isWebBrowser = computed<boolean>(() => !isNativePlatform.value);

    const isWebMobile = computed<boolean>(() => isWebBrowser.value && isMobile);

    const isWebDesktop = computed<boolean>(() => isWebBrowser.value && isDesktop);

    const isAnyMobile = computed<boolean>(() => isNativeMobile.value || isWebMobile.value);

    const isAnyDesktop = computed<boolean>(() => isNativeDesktop.value || isWebDesktop.value);

    const __setCurrentNativePlatform = (platform: CurrentNativePlatform) => {
        _currentNativePlatform.value = platform;
    };

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
        __setCurrentNativePlatform,
    };
});
