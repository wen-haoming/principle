<template>
<div class="viewport" ref="viewportRef">
    <div class="scrollBar" ref="scrollBarRef"></div>
    <div class="scroll-list">

    </div>
</div>
</template>

<script>
import {
    defineComponent,
    ref,
    onMounted,
    reactive
} from 'vue'
export default defineComponent({
    props: {
        size: {
            type: Number
        },
        remain: {
            type: Number
        },
        items: {
            type: Array,

        }
    },
    setup(props) {
        const viewportRef = ref(null)
        const scrollBarRef = ref(null)

        const data = reactive({
            start: 0,
            end: 0,
            offset: 0
        })

        onMounted(() => {
            if (viewportRef.value && scrollBarRef.value) {
                viewportRef.value.style.height = props.size * props.remain + 'px';
                // scrollBarRef
                scrollBarRef.value.style.height = props.size * props.items.length + 'px';
            }
        })

        return {
            viewportRef,
            scrollBarRef
        }
    }
})
</script>

<style lang="less" scoped>
.viewport {
    overflow: scroll;
    position: relative;
}

.scroll-list {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
}
</style>
