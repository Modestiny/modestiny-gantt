<template>
    <virtual-scroll-vertical-table v-bind="virtualProps" @row-click="select">
        <template #table-header>
            <el-popover placement="right" title="筛选项配置" width="300" trigger="click">

                <div  v-for="ele in tableHeaderList">
                    <el-checkbox v-model="ele.visible" :label="ele.label" @change="emit('do-layout')"
                    :disabled="ele.disabled" />
                </div>
                
                <template #reference>
                    <el-icon class="setting">
                        <Setting />
                    </el-icon>
                </template>
            </el-popover>
        </template>
    </virtual-scroll-vertical-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { DateValue, TableProp, Task } from '../model';
import { getBarOffset } from '../utils';
import VirtualScrollVerticalTable from '../basic/virtual-scroll-vertical-table.vue';
import { Setting } from '@element-plus/icons-vue';

interface IProp {

    dateList: DateValue[]

    cellWidth: number

    cellHeight: number

    taskList: Task[]

    tableHeaderList: TableProp[]

}

const props = defineProps<IProp>();

const emit =defineEmits(['do-layout'])


const select = (task: Task) => {
    const { dateList, cellWidth } = props;
    const horizontalStyle = getBarOffset(task.startDate, task.endDate, dateList, 'DAY', cellWidth);
    const left = parseInt(horizontalStyle!.left) || 0;
    const dom = document.querySelector('.virtual-scroll-table .virtual-table-body');
    dom?.scroll({
        left,
        behavior: 'smooth'
    })
}

const virtualProps = computed(() => {
    const { taskList, cellHeight, tableHeaderList } = props;

    const columns = tableHeaderList.filter(v => v.visible);
    return {
        data: taskList,
        rowHeight: cellHeight,
        headerHeight: cellHeight * 2,
        columns
    }
})
</script>

<style scoped lang="less">
.setting {
    position: absolute;
    right: 0px;
    top: 42px;
    cursor: pointer;
    &:hover {
        color:@color-primary;
    }
}
</style>