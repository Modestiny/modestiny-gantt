<template>
    <div class="virtual-scroll-table">
        <div class="virtual-table-header" ref="headerContainer">
            <div class="virtual-scroll-header_wrapper" :style="containerHeaderStyle">
                <div class="table-row" v-for="(ele, rowIndex) in headerRows" :key="rowIndex">
                    <div v-for="(item, colIndex) in displayHeaderColList(rowIndex)" class="table-col"
                        :style="cellHeaderStyle(rowIndex, colIndex)" :key="colIndex">
                        {{ item.label }}
                    </div>
                </div>
            </div>
        </div>
        <div class="virtual-table-body" ref="container">
            <div class="virtual-table-body_wrapper" :style="containerStyle">
                <div class="table-row" v-for="(ele, rowIndex) in displayRowList" :key="rowIndex">
                    <div v-for="(item, colIndex) in displayColList(rowIndex)" class="table-col" :style="cellStyle"
                        :key="colIndex">
                    </div>
                </div>
                <slot name="table-extend" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { computed, ref } from 'vue';
const props = defineProps(['data', 'cellWidth', 'cellHeight', 'columns', 'scrollCallBack'])


const dateFlattenList = computed(() => {
    return props.columns.flatMap((v: any) => [...(v?.children ?? [])]);
})

const dateCount = computed(() => {
    return props.data.length
})

const colCount = computed(() => {
    return dateFlattenList.value.length
})

const headerRows = computed(() => {
    const levelOne = props.columns;

    const otherCount = new Array(dateFlattenList.value.length - props.columns.length).fill(props.columns[0]);

    return [[...levelOne, ...otherCount], dateFlattenList.value]
})


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
        const scrollLeft = (e.target as HTMLDivElement)?.scrollLeft;
        headerContainer.value?.scroll({
            top: scrollTop,
            left: scrollLeft,
        })
        props.scrollCallBack?.(scrollTop);

        if (dateCount.value > rowKeep) {
            const topIndex = Math.floor(scrollTop / props.cellHeight);
            startTopIndex.value = Math.min(topIndex, dateCount.value - rowKeep);;
            endTopIndex.value = startTopIndex.value + rowKeep;
        };


        if (colCount.value > colKeep) {
            const leftIndex = Math.floor(scrollLeft / props.cellWidth);
            startLeftIndex.value = Math.min(leftIndex, colCount.value - colKeep);
            endLeftIndex.value = startLeftIndex.value + colKeep;
        }





    })
})



const cellStyle = computed(() => {
    return {
        width: `${props.cellWidth}px`,
        height: `${props.cellHeight}px`,
    }
})

const cellHeaderStyle = computed(() => {
    return (rowIndex: number, colIndex: number) => {
        const span = headerRows.value[rowIndex][0].children.length;
        return {
            width: `${props.cellWidth * span || props.cellWidth}px`,
            height: `${props.cellHeight}px`,
            background: rowIndex > 0 && [5, 6].includes(colIndex % 7) ? '#f3f4f4' : ''
        }
    }
})


const containerStyle = computed(() => {
    return {
        height: `${dateCount.value * props.cellHeight}px`,
        width: `${colCount.value * props.cellWidth}px`,
        paddingTop: `${startTopIndex.value * props.cellHeight}px`,
        paddingBottom: `${(dateCount.value - rowKeep - startTopIndex.value) * props.cellHeight}px`,
        paddingLeft: `${startLeftIndex.value * props.cellWidth}px`,
        paddingRight: `${(colCount.value - colKeep - startLeftIndex.value) * props.cellWidth}px`,
    }
})


const containerHeaderStyle = computed(() => {
    return {
        width: `${colCount.value * props.cellWidth}px`,
        paddingLeft: `${startLeftIndex.value * props.cellWidth}px`,
        paddingRight: `${(colCount.value - colKeep - startLeftIndex.value) * props.cellWidth}px`,
    }
})


const displayColList = (rowIndex: any) => {
    return dateFlattenList.value.slice(startLeftIndex.value, Math.min(endLeftIndex.value, colCount.value))
}

const displayHeaderColList = (rowIndex: any) => {
    const span = headerRows.value[rowIndex][0].children.length || 1;
    return headerRows.value[rowIndex].slice(startLeftIndex.value / span, Math.min(endLeftIndex.value, colCount.value / span))
}


const displayRowList = computed(() => {
    return props.data?.slice(startTopIndex.value, Math.min(endTopIndex.value, dateCount.value));
})


</script>

<style lang="less" scoped>
.virtual-scroll-table {
    .square(100%);
    .flex(flex-start, flex-start, column);

    .virtual-table-header {
        width: 100%;
        flex-shrink: 0;
        overflow: hidden;
        font-weight: 700;
        color: @color-text-regular;


        .table-row {
            .flex(flex-start);
            position: relative;
            width: 100%;
            border-bottom: 1px solid @border-color-base;
        }


    }

    .virtual-table-body {
        width: 100%;
        height: 100%;
        overflow: auto;

        .virtual-table-body_wrapper {
            position: relative;
        }

        .table-row:hover {
            background: @background-color-base
        }

    }


    .table-col {
        .flex();
        flex-shrink: 0;
        border-right: 1px solid @border-color-base;
        user-select: none;
    }

    .table-row {
        .flex(flex-start);
        width: 100%;
    }

}
</style>