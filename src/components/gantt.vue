

<template>
    <div class="modestiny-gantt">
        <basic-layout :visible-left="true">
            <template #left>
                <table-section v-if="load" v-bind="subProps" @do-layout="doLayout"/>
            </template>

            <template #rightContent>
                <date-section v-if="load" v-bind="subProps">
                    <template #bar-extend="{ task }">
                        <slot name="bar-extend" v-bind="{ task }" />
                    </template>
                </date-section>
            </template>
        </basic-layout>
    </div>
</template>

<script setup lang="ts">
import BasicLayout from '../layout/basic-layout.vue';
import TableSection from './table.vue';
import DateSection from './date.vue';
import { computed, nextTick, reactive, ref } from 'vue';
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

const load = ref(true);

const doLayout = async () => {
    load.value = false;
    await nextTick();
    load.value = true;
}
</script>

<style scoped lang="less">
.modestiny-gantt {
    .square(100%);
    padding: 32px;
}
</style>
