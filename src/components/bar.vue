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
    .flex();
    border-radius: 10px;
    z-index: 1;
    position: absolute;
    font-size: 12px;
    padding: 0 20px;
}
</style>