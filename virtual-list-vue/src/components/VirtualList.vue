<template>
<div class="viewport" ref="viewportRef" @scroll="handleScroll">
    <div class="scrollBar" ref="scrollBarRef"></div>
    <ul class="scroll-list" :style="{transform: `translate3d(0,${data.offset}px,0)` }" ref="scrollListRef">
        <li v-for="(item) in visibieData" :key="item.id" class="list-item" :vid="item.id">
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
    computed,
    onUpdated,
    nextTick
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
        variable: {
            type: Boolean,
        },
    },
    setup(props) {
        const viewportRef = ref(null);
        const scrollBarRef = ref(null);
        const scrollListRef = ref(null);

        const data = reactive({
            start: 0,
            end: props.remain,
            offset: 0,
            positions: [],
        });

        onUpdated(() => {
            nextTick(() => {
                let childNodes = scrollListRef.value.children

                if (!(childNodes && childNodes.length)) return

                childNodes.forEach(node => {
                    let rect = node.getBoundingClientRect()
                    let height = rect.height;
                    let index = +node.getAttribute('vid')
                    let oldHeight = data.positions[index].height
                    let val = oldHeight - height;
                    if (val) {
                        data.positions[index].bottom = data.positions[index].bottom - val;
                        data.positions[index].height = height;
                        for (let i = index + 1; i < data.positions.length; i++) {
                            data.positions[i].top = data.positions[i - 1].bottom
                            data.positions[i].bottom = data.positions[i].bottom - val
                        }
                    }
                })
                scrollBarRef.value.style.height = data.positions[data.positions.length - 1].bottom + 'px'
                console.log(scrollBarRef.value.style.height)
            })
        })

        const prevCount = computed(() => Math.min(data.start, props.remain));
        const nextCount = computed(() =>
            Math.min(props.items.length - data.end, props.remain)
        );
        const visibieData = computed(() =>
            props.items.slice(
                data.start - prevCount.value,
                data.end + nextCount.value
            )
        );

        const methods = {
            initPosition() {
                data.positions = props.items.map((item, index) => ({
                    index,
                    height: props.size,
                    top: index * props.size,
                    bottom: (index + 1) * props.size,
                }));
            },
            getStartIndex(value) {
                let positions = data.positions
                let start = 0;
                let end = data.positions.length;
                let temp = null;

                while (start < end) {
                    let middleIndex = parseInt((start + end) / 2);
                    let middleValue = positions[middleIndex]["bottom"];

                    if (value === middleValue) {
                        return middleIndex + 1;
                    } else if (value > middleValue) {
                        start = middleIndex + 1;
                    } else if (value < middleValue) {
                        if (temp === null || temp > middleIndex) {
                            temp = middleIndex;
                        }
                        end = middleIndex - 1;
                    }
                }
                return temp;
            },
            handleScroll() {
                let scrollTop = viewportRef.value.scrollTop;
                if (props.variable) {
                    data.start = this.getStartIndex(scrollTop);
                    data.end = data.start + props.remain
                    let topVal = data.positions[data.start - prevCount.value]
                    data.offset = topVal ? topVal.top : 0;
                } else {
                    data.start = Math.floor(scrollTop / props.size); // 先计算开始
                    data.end = data.start + props.remain; // 再计算结尾
                    data.offset = data.start * props.size - props.size * prevCount.value; // 计算 croll-list 的偏移量
                }
            },
        };

        onMounted(() => {
            if (viewportRef.value && scrollBarRef.value) {
                viewportRef.value.style.height = props.size * props.remain + "px";
                // scrollBarRef
                scrollBarRef.value.style.height =
                    props.size * props.items.length + "px";
            }
            data.end = data.start + props.remain;

            if (props.variable) {
                methods.initPosition();
            }
        });

        return {
            viewportRef,
            scrollBarRef,
            scrollListRef,
            visibieData,
            ...methods,
            data,
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

.list-item {}
</style>
