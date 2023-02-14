<template>
    <div class="container" ref="container" @scroll="onScroll">
        <div class="content" :style="contentStyle">
            <div v-for="(item, index) in virtualList" :key="index" class="item">{{ item }}</div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

export default {
    setup () {
        const data = ref(Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`))
        const container = ref(null)
        const state = reactive({
            itemSize: 50,
            visibleCount: 10,
            scrollX: 0,
            scrollY: 0
        })

        const virtualList = ref([])

        onMounted(() => {
            state.visibleCount = Math.ceil(container.value.clientWidth / state.itemSize) * Math.ceil(container.value.clientHeight / state.itemSize)
            updateVirtualList()
        })

        const updateVirtualList = () => {
            const { scrollX, scrollY, visibleCount } = state
            const startIndex = Math.floor(scrollY / state.itemSize) * Math.ceil(container.value.clientWidth / state.itemSize)
            const endIndex = startIndex + visibleCount + (Math.ceil(container.value.clientWidth / state.itemSize) - 1)

            virtualList.value = data.value.slice(startIndex, endIndex)
        }

        const onScroll = () => {
            state.scrollX = container.value.scrollLeft
            state.scrollY = container.value.scrollTop
            updateVirtualList()
        }

        const contentStyle = ref({
            padding: '0',
            transform: `translate(${-state.scrollX}px, ${-state.scrollY}px)`
        })

        if (container.value) {
            const paddingVertical = `${Math.ceil(container.value.clientHeight / state.itemSize) * state.itemSize}px`
            const paddingHorizontal = `${Math.ceil(container.value.clientWidth / state.itemSize) * state.itemSize}px`
            contentStyle.value.padding = `${paddingVertical} ${paddingHorizontal} 0 0`
        }

        return {
            container,
            virtualList,
            contentStyle,
            onScroll
        }
    }
}
</script>

<style>
.container {
    width: 400px;
    height: 300px;
    overflow: auto;
}

.content {
    position: relative;
    border: 1px solid #ccc;
}

.item {
    position: absolute;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    line-height: 50px;
    text-align: center;
}
</style>