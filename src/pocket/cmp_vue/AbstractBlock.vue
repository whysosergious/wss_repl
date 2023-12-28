<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue"

import { BuilderBlock } from "../def/block.d"

const component = {
	name: "AbstractBlock_Vue",
}
export default {
	...component,
}
</script>
<script setup lang="ts">
const props = defineProps<{
	block: BuilderBlock
}>()

// const events = computed(() => {
// 	return Object.keys(props.block.event ?? sh.factory.blues[props.block.bid!]?.event ?? {}).reduce((acc: any, event: any) => {
// 		if (Array.isArray((props.block.event ?? sh.factory.blues[props.block.bid!]?.event)[event])) {
// 			let op_vec = props.block.event[event]
// 			// if (/^!ref/.test(op_vec[0])) {
// 			acc[event] = sh.op(op_vec, { block: props.block, cmp: props.block.runtime.ctx, ctx: acc, prop: event })
// 			return acc
// 			// }
//
// 			// let vec = []
// 			// for (let sk of op_vec) {
// 			// 	if (sk === '!vec') {
// 			// 		continue
// 			// 	}
//
// 			// 	if (Array.isArray(sk)) {
// 			// 		if (/^!ref/.test(sk[0])) {
//
// 			// 			vec.push(s)
// 			// 			continue
// 			// 		}
// 			// 		if (sk[0] === '!str') vec.push(sk[1])
// 			// 		continue
// 			// 	}
//
// 			// 	if (sk === '!save_bang') {
// 			// 		acc[event] = sh.bang['!save_bang'](vec, props.block.runtime.ctx)
// 			// 	}
// 			// }
// 		} else {
// 			let [bang_name, arg] = (props.block.event ?? sh.factory.blues[props.block.bid!]?.event)[event]?.split(/(?:(?=[\s\S]*\{)\.|(?<!\.[\s\S]*):)/, 2)
// 			acc[event] = sh.bang[bang_name]?.(props.block, arg)
// 		}
//
// 		return acc
// 	}, {})
// })

// if (props.block.traits.has(BlockTrait.Props)) {
// 	props.block.attr ??= {}
// 	props.block.runtime.attr ??= {}
//	for (let key in props.block.attr) {
//		if (sh.method.assert.isOpVec(props.block.attr[key])) {
//			props.block.runtime.attr[key] ??= computed(() => {
//				return sh.op(props.block.attr[key] as any, { block: props.block, cmp: props.block.runtime.ctx, ctx: props.block.attr, prop: key })
//			})
//			continue
//		}
//		if (props.block.attr[key][0] === "!") {
//			let [bang_name, arg]: any = props.block.attr[key]?.split(/(?:(?=[\s\S]*\{)\.|(?<!\.[\s\S]*):)/, 2)
//			props.block.runtime.attr[key] = sh.bang[bang_name](props.block, arg)
//			continue
//		}
//
//		props.block.runtime.attr[key] = props.block.attr[key]
//	}
//}

//! LAZY_BLOCK: a more abstract DOM ref impl is planned.
//' (notes) --------------------------------------------
//? - one neat solution is to write custom element classes
//? - setting the 'is' block attr to store the `<component></component>`
//? - element reference when the custom element constructor is called..
//? - this is extra nifty for integrations and plugins that require DOM Node bindings
//. - ex. of pro's with the mentioned approach:
//.     - codemirror can call `CodeMirror(this, cm_options)`
//. 		- vue application instances can call 'app.mount(this)'
//' ---------------------------------------------------
// let block_ref = ref()
// props.block.runtime.attr ??= {}
// props.block.runtime.attr.ref = "block_ref"
// onMounted(() => {
// 	props.block.runtime.el = block_ref.value
// 	if (props.block.runtime.state?.codemirror) props.block.runtime.cmi = props.block.runtime.state?.codemirror?.()
// })
// //! END LAZY_BLOCK
//
// //! LAZY_BLOCK: handle BlockTrait.State bangers & OpVectors
// if (props.block.traits.has(BlockTrait.State)) {
// 	props.block.state ??= {}
// 	props.block.runtime.state ??= {}
// 	for (let key in props.block.state) {
// 		if (sh.method.assert.isOpVec(props.block.state[key])) {
// 			props.block.runtime.state[key] ??= computed(() => {
// 				return sh.op(props.block.state[key] as any, { block: props.block, cmp: props.block.runtime.ctx, ctx: props.block.state, prop: key })
// 			})
// 			continue
// 		}
// 		if (props.block.state[key][0] === "!") {
// 			let [bang_name, arg]: any = props.block.state[key]?.split(/(?:(?=[\s\S]*\{)\.|(?<!\.[\s\S]*):)/, 2)
// 			props.block.runtime.state[key] = sh.bang[bang_name](props.block, arg)
// 			continue
// 		}
// 	}
// }
//! END LAZY_BLOCK
</script>
<template>
	<component :id="block.iid" :is="block.is ?? 'div'" :style="block.style" v-bind="block.props" v-on="block.event ?? {}">
		<!-- rendering trait data, should do this in a computed, 
      where we call the coponent factory function with given traits 
		<template v-for="trait of block.traits" :key="`${block.sqiid}#${trait}`"> -->
		<template v-if="block.children?.length">
			<AbstractBlock v-for="(child, idx) of block.children" :block="child as any" :key="`${child.iid}`" />
		</template>
		<template v-if="block.text">
			{{ block.text }}
		</template>
		<!-- </template> -->
	</component>
</template>
<style></style>
