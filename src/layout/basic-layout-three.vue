<template>
    <div class="basic-layout">
        <!-- 左侧内容 -->
        <div class="basic-layout__left" :class="{ 'is-close': !visibleLeft }">
            <transition name="el-fade-in-linear">
                <div v-show="visibleDom" style="height: 100%;">
                    <slot name="left" />
                </div>
            </transition>
            <!-- 过渡效果 -->
            <transition name="el-fade-in-linear">
                <el-skeleton v-show="!visibleDom" :rows="20" animated>
                </el-skeleton>
            </transition>
        </div>

        <!-- 拖动基线 -->
        <div v-if="visibleLeft" class="basic-layout__dragline" @mousedown="handleMousedown" />

        <!-- 右侧内容 -->
        <div class="basic-layout__right" :style="fullScreenStyle">
            <div v-if="$slots.rightHeader" class="basic-layout__header">
                <transition name="el-fade-in-linear">
                    <!-- 头部信息栏 -->
                    <div v-show="visibleDom" style="height: 100%;">
                        <slot name="rightHeader">
                            <!-- 右侧头部区域 -->
                        </slot>
                    </div>
                </transition>
                <!-- 过渡效果 -->
                <transition name="el-fade-in-linear">
                    <el-skeleton v-show="!visibleDom" :rows="20" animated>
                    </el-skeleton>
                </transition>
            </div>
            <div class="basic-layout__content" :class="{ 'no-header': !$slots.rightHeader }">
                <transition name="el-fade-in-linear">
                    <div v-show="visibleDom" style="height: 100%;">
                        <slot name="rightContent">
                            <!-- 右侧内容区域 -->
                        </slot>
                    </div>
                </transition>
                <!-- 过渡效果 -->
                <transition name="el-fade-in-linear">

                    <el-skeleton v-show="!visibleDom" :rows="20" animated>
                    </el-skeleton>
                </transition>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';

const props = defineProps(['visibleLeft'])

const visibleDom = ref(true)

const handleMousedown = (e: MouseEvent) => {
    visibleDom.value = false;
    const disX = e.clientX;
    const leftDom = document.querySelector<HTMLElement>('.basic-layout__left');
    const rightDom = document.querySelector<HTMLElement>('.basic-layout__right');
    const dragDom = document.querySelector<HTMLElement>('.basic-layout__dragline');
    const width = leftDom?.offsetWidth ?? 0;
    const DRAG_LINE_WIDTH = 2; // 拖拽条宽度

    document.onmousemove = (e: MouseEvent) => {
        let moveWidth = e.clientX - disX + width;
        if (moveWidth <= 210) {
            moveWidth = 210;
        }
        if (moveWidth >= 1200) {
            moveWidth = 1200;
        }

        if (!leftDom || !dragDom || !rightDom) return;

        leftDom.style.width = `${moveWidth}px`;
        dragDom.style.left = `${moveWidth}px`;
        rightDom.style.width = `calc(100% - ${DRAG_LINE_WIDTH}px - ${moveWidth}px)`;
        rightDom.style.left = `${moveWidth + DRAG_LINE_WIDTH}px`;
    };
    document.onmouseup = (e: MouseEvent) => {
        document.onmousemove = null;
        document.onmouseup = null;
        visibleDom.value = true;
    };
}



const fullScreenStyle = computed(() => {
    if (!props.visibleLeft.value) {
        return {};
    }
    return {
        width: '100%',
        left: '0',
    };
})


</script>
<style lang="less" scoped>
@layout-header-height: 194px;
@drag-line-width: 2px;

.basic-layout {
    position: relative;
    height: 600px;
    background: @background-color-base;
    border: 1px solid @border-color-base;
    overflow: hidden;

    .skeleton-image {
        width: 100%;
        height: 100%;
    }

    .basic-layout__left {
        width: 288px;
        height: 100%;
        overflow: hidden;
        background: @color-white;

        &.is-close {
            width: 0;
        }
    }

    .basic-layout__dragline {
        position: absolute;
        top: 0;
        left: 288px;
        width: 2px;
        height: 100%;
        cursor: col-resize;
        user-select: none;
        background: @border-color-base;
        transition: 0.2s width ease-in-out;

        &:hover {
            width: 5px;
            background: @color-primary;
        }
    }

    .basic-layout__right {
        position: absolute;
        top: 0;
        left: calc(~"288px + @{drag-line-width}");
        width: calc(~"100% - 288px - @{drag-line-width}");
        min-width: 800px;
        height: 100%;

    }

    .basic-layout__header {
        height: @layout-header-height;
        margin-bottom: 16px;
        overflow: hidden;
        background: @color-white;
    }

    .basic-layout__content {
        height: calc(~"100% - @{layout-header-height} - 16px");
        background: @color-white;
        overflow-x: auto;
        overflow-y: auto;

        &.no-header {
            height: 100%;
        }
    }

    .basic-layout__table {
        height: e("calc(100% - 104px)");
        padding-right: 32px;
        margin-top: 24px;
        margin-right: -32px;
        overflow: auto;
    }

    .basic-layout__pagination {
        margin-top: 24px;
        text-align: right;
    }
}
</style>
    