<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad(options) {
			console.log(options)
			this.src = decodeURIComponent(options.src)
		}
	}
</script>

<style>
</style>
