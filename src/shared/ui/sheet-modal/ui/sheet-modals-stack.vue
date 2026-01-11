<template>
    <u-drawer
        :open="isOpen"
        :nested="isNested"
        :direction="sheetDirection"
        :handle="hasHandle"
        :ui="{
            container: 'border-l border-green-400',
            body: 'border-l border-blue-400',
            content: 'border-l border-red-400',
        }"
        should-scale-background
        class="min-h-72 min-w-96"
        @update:open="onOpenUpdate"
        @animation-end="onAnimationEnd"
    >
        <template v-if="config.title" #title>
            {{ config.title }}
        </template>

        <template v-if="hasDescriptionWithoutTitle" #header>
            {{ config.description }}
        </template>
        <template v-else #description>
            {{ config.description }}
        </template>

        <template v-if="hasEitherTitleOrDescription" #body>
            <component :is="config.contentSlot" />
        </template>
        <template v-else #content>
            <component :is="config.contentSlot" />
        </template>

        <sheet-modals-stack v-if="config.childConfig" :config="config.childConfig" />
    </u-drawer>
</template>

<script setup lang="ts">
    import { usePlatformStore } from '~/entities/platform';
    import { useSheetModalStackStore } from '../lib/use-sheet-modal-stack.store';
    import type { SheetModalStackConfig } from '../model/sheet-modal-stack.config';

    const { unregisterSheetModal } = useSheetModalStackStore();
    const { isAnyDesktop } = storeToRefs(usePlatformStore());

    const { config } = defineProps<{
        config: SheetModalStackConfig;
    }>();

    const isOpen = ref<boolean>(false);

    const hasBeenOpenedOnce = ref<boolean>(false);
    const hasBeenClosedOnce = ref<boolean>(false);

    const isNested = computed<boolean>(() => {
        const hasParentSheet = !!config.parentId;

        return hasParentSheet;
    });

    const sheetDirection = computed<'bottom' | 'right'>(() => (isAnyDesktop.value ? 'right' : 'bottom'));

    const hasHandle = computed<boolean>(() => !isAnyDesktop.value);

    const hasDescriptionWithoutTitle = computed<boolean>(() => !config.title && !!config.description);

    const hasEitherTitleOrDescription = computed<boolean>(() => !!config.title || !!config.description);

    function open() {
        isOpen.value = true;
    }

    function close() {
        isOpen.value = false;
    }

    function onOpenUpdate(open: boolean) {
        if (!open && hasBeenOpenedOnce.value) close();
    }

    function onAnimationEnd(open: boolean) {
        if (open && !hasBeenOpenedOnce.value) {
            hasBeenOpenedOnce.value = true;

            return;
        }

        if (!open && hasBeenOpenedOnce.value && !hasBeenClosedOnce.value) {
            unregisterSheetModal(config.id);

            hasBeenClosedOnce.value = true;

            return;
        }
    }

    onMounted(() => {
        open();

        whenever(
            () => config.closingSignal,
            shouldClose => {
                if (shouldClose) close();
            }
        );
    });
</script>
