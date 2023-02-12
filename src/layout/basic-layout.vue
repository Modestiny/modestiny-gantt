<template>

    <div class="basic-layout">
        <div class="basic-left" ref="left">
            <div class="basic-left-top">
                <slot name="left-top" />
            </div>
            <div class="basic-left-body">
                <div class="resize" :style="{ width: '500px' }"></div>
                <div class="basic-left-content">
                    <slot name="left" />
                </div>
            </div>
        </div>
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
import { computed, ref } from 'vue';
import { useEventListener } from '@vueuse/core'
const left = ref<HTMLDivElement | null>(null)
const right = ref<HTMLDivElement | null>(null)

const scrollTop = ref(0)

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

useEventListener(right, 'scroll', (e) => {
    const scrollTop = (e.target as HTMLDivElement)?.scrollTop
    left.value?.scroll({
        top: scrollTop,
    })
})


computed(() => {

    return {
        scrollTop
    }

})

</script>

<style scoped lang="less">
@border-color: #ebeef5;

.basic-layout {
    display: flex;
    height: 600px;
    border: 2px solid @border-color;
    overflow: hidden;
}

.basic-left {
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #fff;
}

.basic-left::-webkit-scrollbar {
    width: 0;
}

.basic-right {
    overflow-x: scroll;
    width: 0;
    flex: 1;
}

.basic-left-top,
.basic-right-top {
    height: 60px;
    position: sticky;
    background-color: #fff;
    top: 0;
    z-index: 2;
}






.resize::-webkit-scrollbar {
    width: 10px;
    height: inherit;
}

.resize {
    position: sticky;
    top: 0;
    min-width: 280px;
    max-width: calc(100vw - 400px);
    height: calc(100vh - 310px);
    overflow: scroll;
    background: red;
    opacity: 0;
    resize: horizontal;
}

.basic-left-content {
    position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 10px);
  margin: 60px 10px 0 0;
  background-color: #fff;
}

.basic-left-content::-webkit-scrollbar {
    width: 0 !important;
}
</style>