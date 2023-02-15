

<template>
    <div class="modestiny-gantt">
        <basic-layout :visible-left="true">
            <template #left-top>
                <table-header v-bind="subProps" />
            </template>

            <template #left>
                <TableBody v-bind="subProps" />
                
            </template>

            <template #right-top>
                <date-header v-bind="subProps" />

            </template>

            <template #rightContent>
                <!-- <date-header v-bind="subProps" /> -->
                <date v-bind="subProps">
                    <template #bar-extend="{ task }">
                        <slot name="bar-extend" v-bind="{ task }" />
                    </template>
                </date>
            </template>
        </basic-layout>
    </div>
</template>
  
<script setup lang="ts">
import BasicLayout from '../layout/basic-layout-three.vue';
import TableBody from './table.vue';
import Date from './date.vue';
import { computed, reactive } from 'vue';
import { getDateList, getTaskDateRange } from '../utils';
import { TableProp, Task } from '../model';

interface GanttOption {

    /** 边框样式 */
    borderColor?: string

    /** 边框样式 */
    cellWidth: number

    /** 边框样式 */
    cellHeight: number

    /** 任务数据 */
    taskList: Task[]

    /** 表格配置 */
    tableProps: TableProp[]

}
const props = defineProps<GanttOption>()
const subProps = computed(() => {
    const { taskList, tableProps, cellWidth, cellHeight } = props;
    const dateRangeList = getTaskDateRange(props.taskList);
    const dateList = getDateList(dateRangeList[0], dateRangeList[1], 'WEEK', 'DAY');
    return {
        taskList,
        dateList,
        dateRangeList,
        cellHeight,
        cellWidth,
        tableHeaderList: reactive(tableProps)
    }
})
</script>
  
<style scoped lang="less">
.modestiny-gantt {
    .square(100%);
    padding: 32px;
}
</style>
  