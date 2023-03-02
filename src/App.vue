

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

    <!-- <virtual-scroll-tree v-bind="{data}"/> -->
  </div>
</template>

<script setup lang="ts">
import Gantt from './components/gantt.vue';
import { otherList, tableHeaderList } from './mock/index';
import { treeData } from './mock/tree';
import { computed } from 'vue';
import { GanttOption } from './model/props';
import VirtualScrollTree from './basic/virtual-scroll-tree.vue'



const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = 'node'
): any[] => {
  let id = 0
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber =
        deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
      const nodeKey = getKey(key, ++id)
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined,
      }
    })
}

const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`
}

const data = createData(3, 5, 30);

const subProps = computed(() => {
  return {
    taskList: otherList,
    cellHeight:40,
    cellWidth: 100,
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
