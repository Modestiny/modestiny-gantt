<template>
    <div :class="['bar', `bar-${task.id}`]" v-bind="{ style }">
        <slot name="bar-extend" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getBarOffset } from '../utils';

const props = defineProps(['task', 'dateList', 'taskList', 'cellWidth', 'cellHeight', 'taskIndex']);
const style = computed(() => {
    const { task, dateList, cellWidth, cellHeight, taskIndex } = props;
    const horizontalStyle = getBarOffset(task.startDate, task.endDate, dateList, 'DAY', cellWidth);
    const PADDING = 8;
    const verticalStyle = {
        top: `${(cellHeight * taskIndex) + (PADDING / 2)}px`,
        height: `${cellHeight - PADDING}px`
    }
    console.log('task: ', task);

    const status = task.detail.status ?? 'Developing';
    const statusColor: Record<string, string> = {
        'Done': 'rgb(103, 203, 72)',
        'Testing': '#f3a9e9',
        'Developing': 'rgb(0, 157, 255)',
        'Waiting': 'rgb(189, 188, 190)',
    };
    const statusStyle = {
        background: statusColor?.[status]
    }

    return { ...horizontalStyle, ...verticalStyle, ...statusStyle };
})

</script>

<style scoped lang="less">
.bar {
    border-radius: 10px;
    z-index: 1;
    position: absolute;
    background: #f3a9e9;
    font-size: 12px;
    padding: 0 20px;
    .flex();

    .task-info {
        position: absolute;
        left: 100%;
        top: 0;
        margin-left: 20px;
        height: 100%;
        line-height: 100%;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        font-size: 12px;
        white-space: nowrap;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        padding: 0 10px;
    }

}
</style>