<template>
    <div class="scroll-view" ref="container">

        <div class="scroll-container" :style="containerStyle">
            <div class="row" v-for="(ele, rowIndex) in displayRowList" :key="rowIndex">
                <div v-for="(item, colIndex) in displayColList(rowIndex, colIndex)" class="col" :style="cellStyle"
                    :key="colIndex">
                    {{ ele.label + 1 }} {{ item + 1 }}
                </div>
            </div>
        </div>
    </div>


    <!-- <div class="scrollContainer" ref="container">
        <div class="row" v-for="(ele, rowIndex) in date">
            <div v-for="(item, colIndex) in ele" class="col" :style="cellStyle">
                {{ item }} {{ colIndex }}
            </div>
        </div>
    </div> -->
    {{ scrollLeft }} {{ scrollTop }}
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { computed, ref } from 'vue';

// const date = new Array(200).fill(null).map(v => {
//     return new Array(200).fill(null).map((v, i) => (i + 1))
// })

const date: any[] = [];
for (let i = 0; i < 100; i++) {

    const row: any = {
        label: i,
        children: []
    };
    for (let j = 0; j < 100; j++) {
        row.children.push(j)
    }

    date.push(row)

}

const container = ref<HTMLDivElement | null>(null);

const scrollLeft = ref(0);
const scrollTop = ref(0);
const rowKeep = 30;
const colKeep = 20;
const startTopIndex = ref(0);
const startTopOffset = ref(0)
const endTopIndex = ref(rowKeep);
const cellWidth = 100;
const cellHeight = 40;


useEventListener(container, 'scroll', (e: MouseEvent) => {
    const scrollTop = (e.target as HTMLDivElement)?.scrollTop;
    if(!(scrollTop < ((date.length - rowKeep) * cellHeight))) return;

    scrollLeft.value = (e.target as HTMLDivElement)?.scrollLeft;
    const topIndex = Math.floor(scrollTop / cellHeight);
    // if (topIndex + rowKeep > (date.length - 1)) return;
    startTopIndex.value = topIndex;
    endTopIndex.value = startTopIndex.value + rowKeep;
    startTopOffset.value = scrollTop - (scrollTop % cellHeight);
})





const cellStyle = computed(() => {
    return {
        width: `${cellWidth}px`,
        height: `${cellHeight}px`,
    }
})


const containerStyle = computed(() => {
    return {
        paddingTop: `${startTopIndex.value * cellHeight}px`,
        paddingBottom: `${(date.length - rowKeep - startTopIndex.value) * cellHeight}px`,
    }
})


const displayColList = (rowIndex: any, colIndex: any) => {
    console.log('colIndex: ', colIndex);
    return date[rowIndex].children.filter(() => {
        return true;
    })
}

const displayRowList = computed(() => {
    return date.slice(startTopIndex.value, Math.min(endTopIndex.value, date.length));
})


</script>

<style lang="less" scoped>
.scroll-view {
    .size(800px, 600px);
    overflow-x: auto;
    overflow-y: auto;
}

.row {
    .flex(flex-start);
}

.col {
    flex-shrink: 0;
}
</style>