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
import { DateValue } from '../model';
import { dateList } from '../mock';

const props = defineProps(['dateList', 'taskList', 'cellWidth', 'cellHeight', 'dateRangeList'])

const subItemStyle = computed(() => {
  return (index: number) => {
    return {
      width: props.cellWidth + 'px',
      height: props.cellHeight + 'px',
    }
  }

})

const dateFlattenList = computed(() => {
  return props.dateList.flatMap((v: DateValue) => [v, ...(v?.children ?? [])]);
})

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
.date {
  position: relative;
  height: 400px;
  overflow-y: scroll;
}

.col-item {
  border-left: 1px solid @border-color-base;
  border-right: 1px solid @border-color-base;
  flex-shrink: 0;
  .square(100%);
  .flex();


}

.row-item {
  .flex(flex-start);


  .col-item {
    border-left: 1px solid @border-color-base;
    border-right: 1px solid @border-color-base;
    flex-shrink: 0;


  }

  &:hover .col-item {
    background-color: @background-color-base;
  }
}
</style>
