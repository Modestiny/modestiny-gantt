<template>
    <div class="table-header" :style="tableHeaderStyle">
        
        <div v-for="ele in tableHeaderList" class="table-header-item" :style="style(ele.width)">
            {{ ele.label }}
        </div>

        <div class="table-header-item table-operation">

            <el-popover placement="top-start" title="Title" :width="200" trigger="hover"
            content="this is content, this is content, this is content">
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
const props = defineProps(['dateList', 'taskList', 'cellWidth', 'cellHeight', 'tableHeaderList']);
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
</script>

<style scoped lang="less">
@border-color: #ebeef5;

.table-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .table-header-item {
        border: 1px solid @border-color;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        height: 100%;
    }

    .table-operation {
        padding: 0 6px;
    }
}
</style>