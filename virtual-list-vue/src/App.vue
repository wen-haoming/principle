<template>
<div class="wrap">
    <VirtualList :size="50" :remain="6" :items="items"> </VirtualList>
</div>
</template>

<script>
import VirtualList from "./components/VirtualList";

// 使用 Mock
// var items = Mock.mock({
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|1-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1
//     }]
// })
let items = [];
for (let i = 0; i < 1000; i++) {
    items.push({
        id: i,
        value: i
    });
}

export default {
    name: "App",
    components: {
        VirtualList,
    },
    setup() {
        return {
            items
        }
    }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.wrap {
    margin: 50px auto;
    width: 500px;
    height: 300px;
    border: 1px solid #ccc;
}
</style>
