

<template>
  <div class="modestiny-gantt">
    <h1>甘特图</h1>
    <basic-layout>

      <template #left-top>
        <tree-header v-bind="subProps" />
      </template>

      <template #left>
        <tree v-bind="subProps" />
      </template>

      <template #right-top>
        <date-header v-bind="subProps" />
      </template>

      <template #right>
        <date v-bind="subProps" />
      </template>
    </basic-layout>
  </div>
</template>

<script setup lang="ts">
import BasicLayout from './layout/basic-layout-two.vue';
import Tree from './components/tree.vue';
import TreeHeader from './components/tree-header.vue';
import Date from './components/date.vue';
import DateHeader from './components/date-header.vue';
import { taskList, tableHeaderList } from './mock/index';
import { computed } from 'vue';
import { getDateList } from './utils';



const dateList = getDateList('2021-8-25', '2021-11-25', 'WEEK', 'DAY');

const subProps = computed(() => {
  return {
    taskList,
    dateList,
    cellHeight: 30,
    cellWidth: 80,
    tableHeaderList
  }
})



</script>

<style scoped lang="less">
.modestiny-gantt {
  height: 100%;
  width: 100%;
  padding: 32px;
}
</style>
