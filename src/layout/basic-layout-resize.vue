<template>
    <div class="container" ref="container">
        <div v-for="(section, index) in sections" :key="index" class="section"
            :style="{ width: `${section.width}px` }">
            <template v-if="index !== sections.length - 1">
                <div class="divider" @mousedown="handleMouseDown($event, index)" />
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const container = ref<HTMLElement>();

const sections = ref([
    { width: 100, max: 400, min: 80 },
    { width: 100, max: 400, min: 80 },
    { width: 100, max: 400, min: 80 },
    { width: 100, max: 400, min: 80 },
])


const handleMouseDown = (e: MouseEvent, index: number) => {
    console.log('index: ', index);
    console.log('e: ', e);
    e.preventDefault();
    let initialX = e.clientX;
    let isDragging = true;

    const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging) return;
        const distance = (event.clientX - initialX);
        console.log('distance: ', distance);
        const newSections = [...sections.value];
        (newSections[index].width) += distance;
        (newSections[index + 1].width) -= distance;
        sections.value = newSections;
        initialX = event.clientX;
    };

    const handleMouseUp = () => {
        isDragging = false;
        container.value?.removeEventListener('mousemove', handleMouseMove);
        container.value?.removeEventListener('mouseup', handleMouseUp);
    };

    container.value?.addEventListener('mousemove', handleMouseMove);
    container.value?.addEventListener('mouseup', handleMouseUp);
};

</script>

<style lang="less">
.container {
    display: flex;
    height: 200px;
}

.section {
    position: relative;
    background-color: rgb(136, 30, 48);
}

.divider {
    background-color: pink;
    width: 10px;
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    z-index: 2;
}
</style>