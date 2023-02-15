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
    const RATIO = 0.6;
    const verticalStyle = {
        top: `${(cellHeight * taskIndex) +( (1 - RATIO) / 2 * cellHeight )}px`,
        height: `${cellHeight * RATIO}px`
    }

    const status = task.detail.status ?? 'Developing';
    const statusColor: Record<string, string> = {
        'Done': 'rgb(107, 201, 80)',
        'Testing': '#A875FF',
        'Developing': 'rgb(65, 148, 246)',
        'Waiting': '#d3d3d3',
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