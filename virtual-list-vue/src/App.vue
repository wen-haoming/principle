<template>
<div class="wrap">
    <VirtualList :size="50" :remain="6" :variable="true" :items="items">
        <template v-slot:default="{item}">
            <Item :item="item" />
        </template>
    </VirtualList>
</div>
</template>

<script>
import VirtualList from "./components/VirtualList";
import Item from "./components/Item";
import MockJs from 'mockjs'

// 使用 Mock
let items = [];
for (let i = 0; i < 1000; i++) {
    items.push({
        id: i,
        value: MockJs.Random.sentence(5, 50)
    });
}

export default {
    name: "App",
    components: {
        VirtualList,
        Item
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
    box-sizing: border-box;
}

.wrap {
    margin: 50px auto;
    width: 500px;
    height: 300px;
    border: 1px solid #ccc;
}
</style>
