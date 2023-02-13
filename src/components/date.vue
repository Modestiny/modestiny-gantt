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
      v-bind="{ task, taskIndex: index, dateList, taskList, cellWidth, cellHeight }">
      <template #bar-extend>
        <slot v-bind="{ task }" name="bar-extend" />
      </template>
    </bar>
    <today v-if="todayVisible" v-bind="{ dateList, taskList, cellWidth, cellHeight }" />
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import Bar from './bar.vue';
import Today from './today.vue';
const props = defineProps(['dateList', 'taskList', 'cellWidth', 'cellHeight', 'dateRangeList'])

const subItemStyle = computed(() => {
  return (index: number) => {
    return {
      width: props.cellWidth + 'px',
      height: props.cellHeight + 'px',
    }
  }

})

const todayVisible = computed(() => {
  const startDate = new Date(props.dateRangeList[0]).getTime();
  const endDate = new Date(props.dateRangeList[1]).getTime();
  const now = new Date().getTime()
  return now > startDate && now < endDate;
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
