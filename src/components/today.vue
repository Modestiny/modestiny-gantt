<template>
    <div class="today-bar">

        <div class="today-bar-flag">
            today
        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.today-bar {
    height: 100%;
    z-index: 1;
    position: absolute;
    background: rgb(149, 0, 255);
    width: 2px;
    left: 500px;
    top: 0px;

    .today-bar-flag {
        position: absolute;
        top: 0px;
        left: 0px;
        background: rgb(149, 0, 255);
        color:white;
        font-size:12px;
        padding:2px 4px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>