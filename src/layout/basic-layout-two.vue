<template>
    <div class="basic-layout">
        <div class="basic-left" ref="left">
            <div class="basic-left-top">
                <slot name="left-top" />
            </div>
            <div class="basic-left-body">
                <slot name="left" />
            </div>
        </div>
        <div class="basic-resize" ref="resize" />

        <div class="basic-right" ref="right">
            <div class="basic-right-top">
                <slot name="right-top" />
            </div>
            <div class="basic-right-body">
                <slot name="right" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEventListener } from '@vueuse/core'
const left = ref<HTMLDivElement | null>(null)
const right = ref<HTMLDivElement | null>(null)


useEventListener(left, 'scroll', (e: MouseEvent) => {
    const scrollTop = (e.target as HTMLDivElement)?.scrollTop
    right.value?.scroll({
        top: scrollTop,
    })
})

useEventListener(right, 'scroll', (e) => {
    const scrollTop = (e.target as HTMLDivElement)?.scrollTop
    left.value?.scroll({
        top: scrollTop,
    })
})

</script>

<style scoped lang="less">
@border-color: #ebeef5;

.basic-layout {
    display: flex;
    height: 600px;
    border: 2px solid @border-color;
    overflow: hidden;
    background: #fff;
}

.basic-left {
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    min-width: 200px;

    &::-webkit-scrollbar {
        width: 0 !important;
    }
}

.basic-resize {
    width: 2px;
    height: 100%;
    background: @border-color;
    flex-shrink: 0;

    &:hover {
        cursor: e-resize;
        background: #2489f4;
        box-shadow: #ebeef5;
    }
}

.basic-right {
    overflow-x: scroll;
    overflow-y: scroll;
    flex: 1;
}

.basic-left-top,
.basic-right-top {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #fff;
}
</style>