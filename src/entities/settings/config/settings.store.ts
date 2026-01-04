export const useSettingsStore = defineStore('settings', () => {
    const _isNativeMobile = ref<boolean>(false);

    const isNativeMobile = readonly(_isNativeMobile);

    const __toggleIsNativeMobile = () => {
        _isNativeMobile.value = !isNativeMobile.value;
    };

    return {
        isNativeMobile,
        __toggleIsNativeMobile,
    };
});
