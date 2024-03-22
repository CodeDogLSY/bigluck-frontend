<template >
    <view class="like-content">
        <image class="icon" src="../assets/img/like.svg"></image>
        <text class="num">960</text>
    </view>
</template>
<script setup>
</script>
<style lang="scss">
.like-content {
    width: auto;
    height: 20px;
    border: #701b1b solid 1px;
    border-radius: 11px;
    font-size: 14px;
    color: #701b1b;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 6px;

    .icon {
        width: 14px;
        height: 14px;
        margin-right: 4px;

    }
}
</style>