<template>
    <ReusableTemplateDefinition>
        <c-platform-switching />

        <div class="pointer-events-auto">something</div>
    </ReusableTemplateDefinition>

    <u-button
        class="absolute right-4 bottom-4 z-1337 flex size-20 items-center justify-center rounded-full"
        @mouseenter="open"
        @click="() => void open()"
    >
        ADMIN
    </u-button>
</template>

<script setup lang="ts">
    import { CPlatformSwitching } from '~/features/platform-switching';
    import { openSheetModal } from '~/shared/ui/sheet-modal/lib/open-sheet-modal';

    const [ReusableTemplateDefinition, ReusableTemplate] = createReusableTemplate();

    const open = () => {
        openSheetModal({
            title: 'Superadmin Panel',
            contentSlot: () => h(ReusableTemplate),
        });
    };
</script>

<style scoped></style>
