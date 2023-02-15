<template>
    <div class="virtual-table">
        <div class="virtual-table-header" ref="headerContainer">
            <div class="virtual-scroll-header_wrapper" :style="containerHeaderStyle">
                <div class="table-row" v-for="(ele, rowIndex) in headerConfig" :key="rowIndex">
                    <div v-for="(item, colIndex) in displayHeaderColList(rowIndex)" class="table-col"
                        :style="cellHeaderStyle(rowIndex)" :key="colIndex">
                        sticky
                    </div>
                </div>
            </div>
        </div>
        <div class="virtual-table-body" ref="container">
            <div class="virtual-table-body_wrapper" :style="containerStyle">
                <div class="table-row" v-for="(ele, rowIndex) in displayRowList" :key="rowIndex">
                    <slot name="row" v-bind="{ rowIndex }" />
                    <div v-for="(item, colIndex) in displayColList(rowIndex)" class="table-col" :style="cellStyle"
                        :key="colIndex">
                        <slot name="col" v-bind="{ rowIndex, colIndex: item }" />
                    </div>
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
    return new Array(props.rowCount).fill(null).map((i, iIndex) => {
        return new Array(props.colCount).fill(null).map((j, index) => [iIndex, index])
    })
})


const headerConfig = [
    { span: 7, },
    { span: 1, },
]

const container = ref<HTMLDivElement | null>(null);
const headerContainer = ref<HTMLDivElement | null>(null);
const rowKeep = 20;
const colKeep = 20;

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
        startLeftIndex.value = Math.min(leftIndex, props.colCount - colKeep);
        endLeftIndex.value = startLeftIndex.value + colKeep;

        headerContainer.value?.scroll({
            top: scrollTop,
            left: scrollLeft,
        })
    })
})



const cellStyle = computed(() => {
    return {
        width: `${props.cellWidth}px`,
        height: `${props.cellHeight}px`,
    }
})

const cellHeaderStyle = computed(() => {
    return (rowIndex: number) => {
        const span = headerConfig[rowIndex].span;
        return {
            width: `${props.cellWidth * span}px`,
            height: `${props.cellHeight}px`,
        }
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


const containerHeaderStyle = computed(() => {
    console.log(props.colCount);
    return {
        width: `${props.colCount * props.cellWidth}px`,
        paddingLeft: `${startLeftIndex.value * props.cellWidth}px`,
        paddingRight: `${(props.colCount - colKeep - startLeftIndex.value) * props.cellWidth}px`,
    }
})


const displayColList = (rowIndex: any) => {
    return date.value[rowIndex].slice(startLeftIndex.value, Math.min(endLeftIndex.value, date.value[rowIndex].length))
}

const displayHeaderColList = (rowIndex: any) => {
    const span = headerConfig[rowIndex].span;
    return date.value[rowIndex].slice(startLeftIndex.value / span, Math.min(endLeftIndex.value, date.value[rowIndex].length) / span)
}


const displayRowList = computed(() => {
    return date.value.slice(startTopIndex.value, Math.min(endTopIndex.value, props.rowCount));
})


</script>

<style lang="less" scoped>
.virtual-table {
    .square(100%);
    .flex(flex-start, flex-start, column);

    .virtual-table-header {
        width: 100%;
        flex-shrink: 0;
        overflow: hidden;
    }

    .virtual-table-body {
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .table-row {
        .flex(flex-start);
        position: relative;
    }

    .table-col {
        flex-shrink: 0;
    }

}

.scroll-view {
    overflow-x: auto;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    will-change: transform;
}



.scroll-container {
    position: relative;
    transition: all 1s;
}

.stick-row {
    .flex(flex-start);
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    background: white;
}


.bar {
    .size(100px, 20px);
    position: absolute;
    left: 400px;
    top: 0px;
    background-color: aqua;
}
</style>