<template>
    <div>
        <div class="tree-item" :style="subItemStyle" v-for="ele in taskList" @click="select(ele)">

            <div v-for="item in tableHeaderList" :style="style(item.width)" class="table-item">
                <template v-if="item.value === 'key'">
                    <div class="status" :style="getStyle(ele)"></div>
                </template>
                {{ ele[item.value] }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { getBarOffset } from '../utils';
const props = defineProps(['dateList', 'taskList', 'cellWidth', 'cellHeight', 'tableHeaderList']);

const subItemStyle = computed(() => {
    return {
        height: props.cellHeight + 'px',
    }
})


const style = computed(() => {
    return (value: number) => {
        return {
            width: value + 'px',
            height: (props.cellHeight * 2) + 'px',
        }
    }
})


const getStyle = (task: any) => {

    const status = task.status.name ?? 'Developing';
    const statusColor: Record<string, string> = {
        'Done': 'rgb(103, 203, 72)',
        'Testing': '#f3a9e9',
        'Developing': 'rgb(0, 157, 255)',
        'Waiting': 'rgb(189, 188, 190)',
    };
    return {
        background: statusColor?.[status]
    }
}



const select = (task: any) => {
    const { dateList, cellWidth } = props;
    const horizontalStyle = getBarOffset(task.startDate, task.endDate, dateList, 'DAY', cellWidth);
    const left = parseInt(horizontalStyle!.left) || 0;
    const dom = document.querySelector('.basic-right');
    dom?.scroll({
        left,
        behavior: 'smooth'
    })
}
</script>

<style scoped lang="less">
.tree-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        background: #f4f4f4;
    }

    .status {
        margin-right: 8px;
        width: 6px;
        height: 6px;
        border-radius: 2px;
    }

    .table-item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: grey;
    }
}
</style>