<template>
    <virtual-scroll-vertical-table v-bind="virtualProps" @row-click="select">
  
    </virtual-scroll-vertical-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { DateValue, TableProp, Task } from '../model';
import { getBarOffset } from '../utils';
import VirtualScrollVerticalTable from '../basic/virtual-scroll-vertical-table.vue'

interface IProp {

    dateList: DateValue[]

    cellWidth: number

    cellHeight: number

    taskList: Task[]

    tableHeaderList: TableProp[]

}

const props = defineProps<IProp>();


const style = computed(() => {
    return (value: number) => {
        return {
            width: value + 'px',
            height: props.cellHeight + 'px'
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
    console.log('task: ', task);
    const { dateList, cellWidth } = props;
    const horizontalStyle = getBarOffset(task.startDate, task.endDate, dateList, 'DAY', cellWidth);
    const left = parseInt(horizontalStyle!.left) || 0;
    console.log('left: ', left);
    const dom = document.querySelector('.virtual-scroll-table .virtual-table-body');
    console.log('dom: ', dom);
    dom?.scroll({
        left,
        behavior: 'smooth'
    })
}


const virtualProps = computed(() => {
    const { taskList, cellHeight } = props;
    const columns = [
        {
            label: '名称',
            prop: 'key',
            width: 280,
        },
        {
            label: '开始时间',
            prop: 'startDate',
        },
        {
            label: '结束时间',
            prop: 'endDate',
        }
    ]
    return {
        data: taskList,
        rowHeight: cellHeight,
        headerHeight: cellHeight * 2,
        columns
    }
})
</script>

<style scoped lang="less">
.table {
    border: 1px solid @border-color-base;

    .table-item {
        .flex(flex-start, flex-start);
        font-size: @font-size-base;
        cursor: pointer;
        color: @color-text-regular;

        &:hover {
            background: @background-color-base;
        }

        .status {
            .square(6px);
            margin-right: 8px;
            border-radius: 2px;
        }


        .table-item-cell {
            .ellipsis();
            padding: 8px;
        }
    }
}
</style>