

<template>
  <div class="modestiny-gantt">
    <gantt v-bind="subProps">
      <template #bar-extend="{ task }">
        <el-popover placement="top" title="asdf" width="300" trigger="hover" content="dsafdfasdf">
          <template #reference>
            <el-button class="bar-extend" type="primary">{{ task.key }}</el-button>
          </template>
        </el-popover>
        {{ task.name }}
      </template>
    </gantt>

    <!-- <aa/> -->
  </div>
</template>

<script setup lang="ts">
import Gantt from './components/gantt.vue';
import aa from './layout/virtual-scroll.vue';
import { otherList, tableHeaderList } from './mock/index';
import { computed } from 'vue';
import { GanttOption } from './model/props';


const subProps = computed(() => {
  return {
    taskList: otherList,
    cellHeight: 40,
    cellWidth: 80,
    tableProps: tableHeaderList
  } as GanttOption
})



</script>

<style scoped lang="less">
.modestiny-gantt {
  height: 100%;
  width: 100%;
  padding: 32px;

  .bar-extend {
    position: absolute;
    left:100%;
  }
}
</style>
