<template>
    <div class="scroll-view" ref="container">
        <div class="scroll-container" :style="containerStyle">

            <!-- <div class="stick-row">
                <div v-for="(item, colIndex) in displayColList(1)" class="col" :style="cellStyle"
                    :key="colIndex">
                    sticky
                </div>
            </div> -->


            <div class="row" v-for="(ele, rowIndex) in displayRowList" :key="rowIndex">
                <slot name="row" v-bind="{ rowIndex }" />
                <div v-for="(item, colIndex) in displayColList(rowIndex)" class="col" :style="cellStyle"
                    :key="colIndex">
                    <slot name="col" v-bind="{ rowIndex, colIndex: item }" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { computed, ref } from 'vue';
const props = defineProps(['rowCount', 'colCount', 'cellWidth', 'cellHeight'])

const date = computed(() => {
    return new Array(props.rowCount).fill(null).map((i,iIndex) => {
        return new Array(props.colCount).fill(null).map((j, index) => [iIndex,index])
    })
})

const container = ref<HTMLDivElement | null>(null);
const rowKeep = 40;
const colKeep = 40;

const startTopIndex = ref(0);
const endTopIndex = ref(rowKeep);

const startLeftIndex = ref(0);
const endLeftIndex = ref(colKeep);



useEventListener(container, 'scroll', (e: MouseEvent) => {
    requestAnimationFrame(() => {
        const scrollTop = (e.target as HTMLDivElement)?.scrollTop;
        const topIndex = Math.floor(scrollTop / props.cellHeight);
        startTopIndex.value = Math.min(topIndex, props.rowCount - rowKeep);;
        endTopIndex.value = startTopIndex.value + rowKeep;

        const scrollLeft = (e.target as HTMLDivElement)?.scrollLeft;
        const leftIndex = Math.floor(scrollLeft / props.cellWidth);
        console.log('leftIndex: ', leftIndex);
        startLeftIndex.value = Math.min(leftIndex, props.colCount - colKeep);
        endLeftIndex.value = startLeftIndex.value + colKeep;
    })
})

const cellStyle = computed(() => {
    return {
        width: `${props.cellWidth}px`,
        height: `${props.cellHeight}px`,
    }
})

const containerStyle = computed(() => {
    console.log(props.colCount);
    return {
        height: `${props.rowCount * props.cellHeight}px`,
        width: `${props.colCount * props.cellWidth}px`,
        paddingTop: `${startTopIndex.value * props.cellHeight}px`,
        paddingBottom: `${(props.rowCount - rowKeep - startTopIndex.value) * props.cellHeight}px`,
        paddingLeft: `${startLeftIndex.value * props.cellWidth}px`,
        paddingRight: `${(props.colCount - colKeep - startLeftIndex.value) * props.cellWidth}px`,
    }
})


const displayColList = (rowIndex: any) => {
    return date.value[rowIndex].slice(startLeftIndex.value, Math.min(endLeftIndex.value, date.value[rowIndex].length))
}

const displayRowList = computed(() => {
    return date.value.slice(startTopIndex.value, Math.min(endTopIndex.value, props.rowCount));
})


</script>

<style lang="less" scoped>
.scroll-view {
    overflow-x: auto;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    will-change: transform;
}

.row {
    .flex(flex-start);
    position: relative;
}

.scroll-container {
    position: relative;
}

.stick-row {
    .flex(flex-start);
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    background: white;
}

.col {
    flex-shrink: 0;
}

.bar {
    .size(100px, 20px);
    position: absolute;
    left: 400px;
    top: 0px;
    background-color: aqua;
}
</style>