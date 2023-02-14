<template>


    <el-table-v2 fixed :columns="columns" :data="tableData" :width="700" :height="400">



    </el-table-v2>
    <!-- <el-table-v2 fixed :data="tableData" style="width: 100%" height="100%" :span-method="objectSpanMethod">
        <el-table-column prop="name" label="Name" fixed width="200" />
        <el-table-column prop="name" label="Name" fixed width="200" />
        <el-table-column prop="name" label="Name" fixed width="200" />
        <el-table-column v-for="ele in dateList" prop="date" :label="ele.label" width="200">
            <el-table-column v-for="item in ele.children" prop="name" :label="item.label" width="200" />
        </el-table-column>
    </el-table-v2> -->
</template>

<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus'
import {
    ElButton,
    ElTag,
    TableV2FixedDir,
    TableV2SortOrder,
} from 'element-plus'
import type { Column, SortBy } from '@element-plus/components/table-v2'

const columns: Column<any>[] = [
    {
        key: 'name',
        title: 'name',
        dataKey: 'name',
        width: 150,
    },
    {
        key: 'date',
        title: 'date',
        dataKey: 'date',
        width: 150,
        align: 'center',
    },
    {
        key: 'state',
        title: 'state',
        dataKey: 'state',
        width: 150,
    },
    {
        key: 'operations',
        width: 150,
        align: 'center',
    },
    {
        key: 'operations',
        width: 150,
        align: 'center',
    },
    {
        key: 'operations',
        width: 150,
        align: 'center',
    },
    {
        key: 'operations',
        width: 150,
        align: 'center',
    },
    {
        key: 'operations',
        width: 150,
        align: 'center',
    },
    {
        key: 'operations',
        width: 150,
        align: 'center',
    },
    {
        key: 'operations',
        width: 150,
        align: 'center',
    },
]


const CustomizedHeader: FunctionalComponent<
  TableV2CustomizedHeaderSlotParam
> = ({ cells, columns, headerIndex }) => {
  if (headerIndex === 2) return cells

  const groupCells = [] as typeof cells
  let width = 0
  let idx = 0

  columns.forEach((column, columnIndex) => {
    if (column.placeholderSign === TableV2Placeholder)
      groupCells.push(cells[columnIndex])
    else {
      width += cells[columnIndex].props!.column.width
      idx++

      const nextColumn = columns[columnIndex + 1]
      if (
        columnIndex === columns.length - 1 ||
        nextColumn.placeholderSign === TableV2Placeholder ||
        idx === (headerIndex === 0 ? 4 : 2)
      ) {
        groupCells.push(
          <div
            class="flex items-center justify-center custom-header-cell"
            style={{
              ...cells[columnIndex].props!.style,
              width: `${width}px`,
            }}
          >
            Group width {width}
          </div>
        )
        width = 0
        idx = 0
      }
    }
  })
  return groupCells
}

interface User {
    id: string
    name: string
    amount1: string
    amount2: string
    amount3: number
}
interface SpanMethodProps {
    row: User
    column: TableColumnCtx<User>
    rowIndex: number
    columnIndex: number
}
const props = defineProps(['dateList', 'cellWidth', 'cellHeight'])


const objectSpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}: SpanMethodProps) => {
    if (columnIndex === 0) {
        if (rowIndex % 4 === 0) {
            return {
                rowspan: 4,
                colspan: 1,
            }
        } else {
            return {
                rowspan: 0,
                colspan: 0,
            }
        }
    }
}

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
]
</script>

<style scoped>

</style>