<template>
    <div class="table">
        <div class="table-item" :style="subItemStyle" v-for="ele in taskList" @click="select(ele)">
            <div v-for="item in displayHeaderList" :style="style(item.width)" class="table-item-cell">
                <div>
                    {{ getText(ele, item.value) }}
                </div>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { DateValue, TableProp, Task } from '../model';
import { getBarOffset } from '../utils';

interface IProp {

    dateList: DateValue[]

    cellWidth: number

    cellHeight: number

    taskList: Task[]

    tableHeaderList: TableProp[]

}

const props = defineProps<IProp>();

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

const getText = (task: Task, key: string) => {
    return (task as any)?.[key] ?? '--';
}


const getStyle = (task: Task) => {
    const status = task.detail.status ?? 'Developing';
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

const displayHeaderList = computed(() => {
    return props.tableHeaderList.filter(v => v.visible)
})


const select = (task: Task) => {
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
.table-item {
    .flex(flex-start);
    font-size: @font-size-sm;
    cursor: pointer;

    &:hover {
        background: @background-color-base;
    }

    .status {
        .square(6px);
        margin-right: 8px;
        border-radius: 2px;
    }

    .table-item {
        font-size: 12px;
        color: @color-text-regular;
    }

    .table-item-cell {
        .flex(flex-start);
        .ellipsis();
        padding: 8px;
    }
}
</style>