<template>
    <div class="tree-header">
        <div v-for="ele in tableHeaderList" :style="style(ele.width)">
            {{ ele.label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps(['dateList', 'taskList', 'cellWidth', 'cellHeight', 'tableHeaderList']);
const style = computed(() => {
    return (value: number) => {
        return {
            width: value + 'px',
            height: (props.cellHeight * 2) + 'px',
        }
    }
})
</script>

<style scoped lang="less">
@border-color: #ebeef5;

.tree-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    div {
        border: 1px solid @border-color;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
    }
}
</style>