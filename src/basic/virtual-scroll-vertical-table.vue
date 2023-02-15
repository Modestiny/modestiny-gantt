<template>
    <div class="virtual-scroll-vertical-table">
        <div class="virtual-table-header" ref="headerContainer">
            <div class="table-row">
                <div v-for="(item, colIndex) in columns" class="table-cell" :style="cellHeaderStyle(item)"
                    :key="colIndex">
                    {{ item.label }}
                </div>
                <slot name="table-header" />
            </div>
        </div>

        <div class="virtual-table-body" ref="container">
            <div class="virtual-table-body_wrapper" :style="containerStyle">
                <div class="table-row" v-for="(ele, rowIndex) in displayRowList" :key="rowIndex"
                    @click="$emit('row-click', ele)">
                    <div v-for="(item, colIndex) in columns" class="table-cell" :style="cellStyle(item)"
                        :key="colIndex">
                        {{ ele[item.prop] }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { computed, ref } from 'vue';
const props = defineProps(['data', 'headerHeight', 'rowHeight', 'columns'])

const container = ref<HTMLDivElement | null>(null);
const headerContainer = ref<HTMLDivElement | null>(null);
const rowKeep = 20;
const startTopIndex = ref(0);
const endTopIndex = ref(rowKeep);



const dateCount = computed(() => {
    return props.data.length
})


useEventListener(container, 'scroll', (e: MouseEvent) => {
    requestAnimationFrame(() => {
        const scrollTop = (e.target as HTMLDivElement)?.scrollTop;
        const scrollLeft = (e.target as HTMLDivElement)?.scrollLeft;
        headerContainer.value?.scroll({
            left: scrollLeft,
        })

        if (dateCount.value < rowKeep) return;

        const topIndex = Math.floor(scrollTop / props.rowHeight);
        startTopIndex.value = Math.min(topIndex, dateCount.value - rowKeep);;
        endTopIndex.value = startTopIndex.value + rowKeep;

    })
})

const cellStyle = computed(() => {
    return (item: any) => {
        return {
            // width: item.width ? `${item.width}px` : `100%`,
            width: `100%`,
            height: `${props.rowHeight}px`,
        }
    }
})

const cellHeaderStyle = computed(() => {
    return (item: any) => {
        return {
            // width: item.width ? `${item.width}px` : `100%`,
            width: `100%`,
            height: `${props.headerHeight ?? 40}px`,
        }
    }
})

const containerStyle = computed(() => {
    return {
        height: `${dateCount.value * props.rowHeight}px`,
        paddingTop: `${startTopIndex.value * props.rowHeight}px`,
        paddingBottom: `${(dateCount.value - rowKeep - startTopIndex.value) * props.rowHeight}px`,
    }
})

const displayRowList = computed(() => {
    return props.data.slice(startTopIndex.value, Math.min(endTopIndex.value, dateCount.value));
})


</script>

<style lang="less" scoped>
.virtual-scroll-vertical-table {
    .square(100%);
    .flex(flex-start, flex-start, column);
    padding: 0 10px 8px 10px;

    .table-cell {
        .flex(flex-start);
        padding: 0 8px;
        user-select: none;
    }

    .virtual-table-header {
        width: 100%;
        flex-shrink: 0;
        overflow: hidden;

        .table-cell {
            font-weight: 700;
            color: @color-text-regular;
        }

        .table-row {
            border-bottom: 1px solid @border-color-base;
            padding-bottom: 1px;
        }
    }

    .virtual-table-body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding-bottom: 8px;

        .table-cell {
            font-size: 14px;
            color: @color-text-primary;
        }

        .table-row:hover {
            background: @background-color-base
        }
    }

    .table-row {
        .flex(flex-start);
        position: relative;
        width: 100%;
    }
}
</style>