<template>
<div class="viewport" ref="viewportRef" @scroll="handleScroll">
    <div class="scrollBar" ref="scrollBarRef"></div>
    <ul class="scroll-list" :style="{transform:`translate3d(0,${data.offset}px,0)`}">
        <li v-for="(item) in visibieData" :style="{height:size+'px'}" :key="item.id">
            <slot :item="item" />
        </li>
    </ul>
</div>
</template>

<script>
import {
    defineComponent,
    ref,
    onMounted,
    reactive,
    computed
} from "vue";

export default defineComponent({
    props: {
        size: {
            type: Number,
        },
        remain: {
            type: Number,
        },
        items: {
            type: Array,
        },
    },
    setup(props) {
        const viewportRef = ref(null);
        const scrollBarRef = ref(null);

        const data = reactive({
            start: 0,
            end: props.remain,
            offset: 0,
        });

        const methods = {
            initPosition() {

            },
            handleScroll() {
                let scrollTop = viewportRef.value.scrollTop
                data.start = Math.floor(scrollTop / props.size)
                data.end = data.start + props.remain

                //  props.offset =
                data.offset = data.start * props.size

                console.log(data.offset, '---')
            }
        }

        const visibieData = computed(() => props.items.slice(data.start, data.end))

        onMounted(() => {
            if (viewportRef.value && scrollBarRef.value) {
                viewportRef.value.style.height = props.size * props.remain + "px";
                // scrollBarRef
                scrollBarRef.value.style.height =
                    props.size * props.items.length + "px";
            }
            data.end = data.start + props.remain
        });

        return {
            viewportRef,
            scrollBarRef,
            visibieData,
            ...methods,
            data
        };
    },
});
</script>

<style lang="less" scoped>
.viewport {
    overflow: scroll;
    position: relative;
}

.scroll-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
</style>
