<template>
    <div class="main-item-list flex">
        <div v-for="ele in dateList" class="main-item">
            <div class="main-item-label" :style="mainLabelStyle">
                {{ ele.label }}
            </div>

            <div class="sub-item-list flex">
                <div class="item sub-item" v-for="(item, index) in ele.children" :style="subItemStyle(index)"> {{
                        item.label
                }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['dateList', 'cellWidth', 'cellHeight'])

const mainLabelStyle = computed(() => {
    return {
        height: props.cellHeight + 'px',
    }
})

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

.flex {
   .flex(flex-start);
}

.main-item-list {
    text-align: center;
    background: white;

    .main-item {
        flex-shrink: 0;
        font-weight: bold;
        font-size: 12px;

        .main-item-label {
            .flex();

            border: 1px solid @border-color-base;
            background: white;

        }

        .sub-item-list {
            .sub-item {
                border: 1px solid @border-color-base;
                .flex(flex-start);
                flex-shrink: 0;
                background: white;

            }
        }


    }

}
</style>