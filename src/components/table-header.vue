<template>
    <div class="table-header" :style="tableHeaderStyle">

        <div v-for="ele in displayHeaderList" class="table-header-item" :style="style(ele.width)">
            {{ ele.label }}
        </div>

        <div class="table-header-item table-operation">

            <el-popover placement="right-start" title="筛选项" :width="200" trigger="hover">
                <div class="check-item" v-for="ele in tableHeaderList">
                    <el-checkbox v-model="ele.visible" :disabled="ele.disabled">{{ ele.label }}</el-checkbox>
                </div>
                <template #reference>
                    <el-icon slot="reference" size="20">
                        <Setting />
                    </el-icon>
                </template>
            </el-popover>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Setting } from '@element-plus/icons-vue';
import { ElIcon, ElPopover } from 'element-plus';
import { DateValue, TableProp, Task } from '../model';

interface IProp {

    dateList: DateValue[]

    cellWidth: number

    cellHeight: number

    taskList: Task[]

    tableHeaderList: TableProp[]

}

const props = defineProps<IProp>();
const tableHeaderStyle = computed(() => {
    return {
        height: (props.cellHeight * 2) + 'px',
    }
})

const style = computed(() => {
    return (value: number) => {
        return {
            width: value + 'px',
        }
    }
})


const displayHeaderList = computed(() => {
    return props.tableHeaderList.filter(v => v.visible)
})
</script>

<style scoped lang="less">
.table-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .table-header-item {
        .flex();
        border: 1px solid @border-color-base;
        font-weight: bold;
        font-size: @font-size-base;
        height: 100%;
    }

    .table-operation {
        padding: 0 6px;
    }
}
</style>