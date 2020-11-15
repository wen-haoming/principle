<template>
<div class="item" style="padding:10px 0; font-size:15px">
    {{item.value}}
</div>
</template>

<script>
export default {
    props: {
        item: Object
    }
}
</script>

<style lang="less" scoped>
.item {
    text-align: center;
    height: 100%;
    border-bottom: 1px solid #ccc;
}
</style>
