<template>
    <div class="main-item-list flex">
        <div v-for="ele in dateList" class="main-item">
            <div class="main-item-label" :style="mainLabelStyle">
                {{ ele.label }}
            </div>

            <div class="sub-item-list flex">
                <div class="item sub-item" v-for="(item, index) in ele.children" :style="subItemStyle(index)"> {{
                    item.label
                }}</div>
            </div>
        </div>
    </div>

    <div class="date-header">
        <virtual-scroll v-bind="virtualProps">
            <template #row="{ rowIndex }">
            </template>
            <template #col="{ rowIndex, colIndex }">
                <div class="col-item">
                     <!-- {{ rowIndex == 0 ? dateList[rowIndex].label :
                dateList[rowIndex][colIndex].label}}  -->

                {{ rowIndex }} {{ colIndex }}
            </div>
            </template>
        </virtual-scroll>
    </div>


</template>

<script setup lang="ts">
import { computed } from 'vue';
import VirtualScroll from '../layout/virtual-scroll.vue';
import { DateValue } from '../model';

const props = defineProps(['dateList', 'cellWidth', 'cellHeight'])

const mainLabelStyle = computed(() => {
    return {
        height: props.cellHeight + 'px',
    }
})

const subItemStyle = computed(() => {
    return (index: number) => {
        return {
            width: props.cellWidth + 'px',
            height: props.cellHeight + 'px',
            background: [5, 6].includes(index) ? '#f5f5f5' : ''
        }
    }
})

const dateFlattenList = computed(() => {
    return props.dateList.flatMap((v: DateValue) => [v, ...(v?.children ?? [])]);
})

const virtualProps = computed(() => {

    const { cellWidth, cellHeight } = props;
    return {
        rowCount: 2,
        colCount: dateFlattenList.value.length,
        cellWidth,
        cellHeight
    }
})
</script>

<style scoped lang="less">
.flex {
    .flex(flex-start);
}

.date-header {
    width: 600px;
    height: 80px;
}

.main-item-list {
    text-align: center;
    background: white;

    .main-item {
        flex-shrink: 0;
        font-weight: bold;
        font-size: 12px;

        .main-item-label {
            .flex();

            border: 1px solid @border-color-base;
            background: white;

        }

        .sub-item-list {
            .sub-item {
                border: 1px solid @border-color-base;
                .flex(flex-start);
                flex-shrink: 0;
                background: white;

            }
        }


    }

}
</style>