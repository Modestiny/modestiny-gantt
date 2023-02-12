<template>
  <div class="date">
    <div class="row-item" v-for="(ele, index) in taskList.length">
      <template v-for="item in dateList">
        <template v-for="(col, colIndex) in item.children">
          <div :class="['col-item', { 'is-odd': index % 2 == 1 }]" :style="subItemStyle(colIndex)"></div>
        </template>
      </template>
    </div>
    <bar v-for="(task, index) in taskList"
      v-bind="{ task, taskIndex: index, dateList, taskList, cellWidth, cellHeight }" />
    <today />
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import Bar from './bar.vue';
import Today from './today.vue';
import { taskList } from '../mock';
const props = defineProps(['dateList', 'taskList', 'cellWidth', 'cellHeight'])
const dateCount = props.dateList.flatMap((v: any) => v.children).length;

const subItemStyle = computed(() => {
  return (index: number) => {
    return {
      width: props.cellWidth + 'px',
      height: props.cellHeight + 'px',
      background: [5, 6].includes(index) ? '#f5f5f5' : ''
    }
  }

})

</script>

<style scoped lang="less">
@border-color: #ebeef5;

.date {
  position: relative;
}

.row-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .col-item {
    border-left: 1px solid @border-color;
    border-right: 1px solid @border-color;
    flex-shrink: 0;


  }

  &:hover .col-item {
    background-color: #f5f5f5;
  }
}
</style>
