<template>

    <el-input v-model="keyword"></el-input>

    <div class="virtual-scroll-tree" ref="container">

        <div class="tree-list-wrapper" :style="containerStyle">
            <div v-for="item in treeList" class="item" :style="expandStyle(item)" @click="toggleExpand(item)">
                <div class="expand">
                    <el-icon v-if="item.children && item.children.length">
                        <CaretBottom v-if="item.isExpand" />
                        <CaretRight v-else />
                    </el-icon>
                </div>
                <div class="check">
                    <el-checkbox v-model="item.isChecked"></el-checkbox>
                </div>
                <div class="info">
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { CaretRight, CaretBottom } from '@element-plus/icons-vue';
import { computed, reactive, ref } from 'vue';
import { useEventListener } from '@vueuse/core';
const props = defineProps(['data']);


const container = ref<HTMLDivElement | null>(null);
const rowKeep = 10;

const scrollTopValue = ref(0);
const startIndex = ref(0);
const endIndex = ref(rowKeep);
const dataCount = ref(0);

useEventListener(container, 'scroll', (e: MouseEvent) => {
    requestAnimationFrame(() => {
        const scrollTop = (e.target as HTMLDivElement)?.scrollTop;
        scrollTopValue.value = scrollTop;
    })
},{ passive: false })

const keyword = ref('')
const flattenData = (data: any[]) => {
    const list: any = [];
    const value = _.cloneDeep(data);
    const flatMethod = (data: any[], level = 1, parent?: any) => {
        data.forEach(item => {
            item.level = level;
            item.isExpand = keyword.value ? true : false;
            item.parent = parent;
            item.isShow = true;
            item.isClicked = false;
            item.isChecked = false;
            if (parent && !parent.isExpand) {
                item.isShow = false;
            }
            list.push(item);
            if (item.children?.length) {
                flatMethod(item.children, level + 1, item);
            }
        })
    }
    flatMethod(value);
    return list;
}
const list = reactive(flattenData(props.data));
const expandStyle = computed(() => {
    return (item: any) => {
        return {
            paddingLeft: `${item.level * 20}px`,
            background: `${item.isClicked ? '#f4f4f4' : ''}`
        }
    }
})


const containerStyle = computed(() => {
    return {
        paddingTop: `${startIndex.value * 40}px`,
        paddingBottom: `${(dataCount.value - rowKeep - startIndex.value) * 40}px`,
    }
})

const treeList = computed(() => {
    const data = list.filter((v: any) => v.isShow);
    dataCount.value = data.length;
    const [start, end] = getDataRange(scrollTopValue.value, 40, data.length, rowKeep);
    startIndex.value = start;
    endIndex.value = end;
    return data.slice(start, end);
})


const toggleExpand = (item: any) => {
    const toggle = (item: any, isExpand: boolean) => {
        if (item.parent.isExpand) {
            item.isShow = true;
        }
        if (!isExpand) {
            item.isShow = false;
        }
        if (item.children?.length) {
            item.children.forEach((v: any) => {
                toggle(v, isExpand);
            })
        }
    }
    item.isExpand = !item.isExpand;
    for (let index = 0; index < list.length; index++) {
        if (list[index].isClicked) {
            list[index].isClicked = false;
            break;
        }
    }
    item.isClicked = true;

    item.children?.forEach((v: any) => {
        v.isShow = item.isExpand;
        toggle(v, item.isExpand);
    })
}


const getDataRange = (scrollDistance: number, itemWidth: number, dataCount: number, keep: number) => {
    const moveCount = Math.floor(scrollDistance / itemWidth);
    let start = Math.min(moveCount, dataCount - keep);
    start = Math.max(0, start);
    const end = Math.min(start + keep, dataCount);
    return [start, end];
}

</script>

<style scoped lang="less">
.virtual-scroll-tree {
    height: 330px;
    overflow-y: auto;
    border:1px solid @border-color-base;
    box-shadow: @shadow-1-down;

    .item {
        height: 40px;
        .flex(flex-start);


        &:hover {
            background: @background-color-base;
        }

        .expand {
            width: 80px;
            cursor: pointer;
        }
        .check {
            width: 80px;
        }
    }
}
</style>