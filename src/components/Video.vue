<template>
	<video
		ref="swiper_video"
		playsinline
		autoplay
		muted
		loop
	>
		<source
			:src="path"
			type="video/mp4"
		>
	</video>
</template>

<script>
export default {
	name: 'Video',

	props: {
		path: {
			type: String,
			default: ''
		}
	}
}
</script>
