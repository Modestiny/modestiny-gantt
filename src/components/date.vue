<template>
  <virtual-scroll-table v-bind="virtualProps">
    <template #table-extend>
      <bar v-for="(task, index) in taskList"
        v-bind="{ task, taskIndex: index, dateList, taskList, cellWidth, cellHeight }">
        <template #bar-extend>
             <slot v-bind="{ task }" name="bar-extend" />
        </template> 
      </bar>
      <today v-if="todayVisible" v-bind="{ dateList, taskList, cellWidth, cellHeight }" />
    </template>
  </virtual-scroll-table>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import Bar from './bar.vue';
import Today from './today.vue';
import VirtualScrollTable from '../basic/virtual-scroll-table.vue';

const props = defineProps(['dateList', 'taskList', 'cellWidth', 'cellHeight', 'dateRangeList'])

const todayVisible = computed(() => {
  const startDate = new Date(props.dateRangeList[0]).getTime();
  const endDate = new Date(props.dateRangeList[1]).getTime();
  const now = new Date().getTime()
  return now > startDate && now < endDate;
})

const virtualProps = computed(() => {

  const { taskList, cellWidth, cellHeight, dateList } = props;

  return {
    data: taskList,
    columns: dateList,
    cellWidth,
    cellHeight,
    scrollCallBack(scrollTop: number) {
      const dom = document.querySelectorAll('.virtual-scroll-vertical-table .virtual-table-body')[0]
      dom?.scroll({
        top: scrollTop
      })
    }
  }
})


</script>

<style scoped lang="less">

</style>
