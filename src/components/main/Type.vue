<template>
	<div class="type" :class="{'active': activeSlide === index}">
		<div v-for="e in mapImages" :key="e.position" :class="e.classes">
			<template v-if="getImageByPosition(e.position)">
				<img
					v-if="isImage(getImageByPosition(e.position))"
					:src="getImageByPosition(e.position)" alt="" />
				<Video v-else :path="getImageByPosition(e.position)" />
			</template>
		</div>
		<div class="type-bottom">
			<div class="type-bottom-col">
				<img :src="value.icon" alt="" />
				<div v-html="value.full_name" />
			</div>
		</div>
	</div>
</template>

<script>
import Video from "@/components/Video";

export default {
	name: 'Type',

	props: {
		value: {
			type: Object,
			default: () => ({})
		},
		activeSlide: {
			type: Number,
			default: 0
		}
	},

	components: {
		Video
	},

	computed: {
		index() {
			return this.$vnode.key;
		},
		mapImages() {
			return [
				{
					position: 3,
					classes: "type-right-image"
				},
				{
					position: 2,
					classes: "type-center-image two"
				},
				{
					position: 1,
					classes: "type-center-image one"
				}
			];
		}
	},

	methods: {
		isImage(path) {
			const images = ['jpg','png','gif','BMP','webp'];
			const arr = path.split('.');
			const format = arr[arr.length - 1];
			return images.includes(format);
		},
		getImageByPosition(p) {
			const res = this.value.gallery.filter(v => v.position === p)[0];
			return res && res.file;
		}
	}
}
</script>

<style lang="scss" scoped>
.type {
	*{
		color: $white;
	}
}
.type{
	opacity: 0;
	transition: opacity .5s;
	&.active{
		opacity: 1;
	}
	&:before{
		content: '';
		background-image: url('~@/assets/svg/bg-main.svg');
		background-position: top;
		background-size: contain;
		margin: 0;
		padding: 0;
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		z-index: 1;
	}
	& img{
		height: auto;
		width: 100%;
	}
	&-center-image{
		position: absolute;
		&.one{
			top: $mainImageOneTop;
			right: $mainImageOneRight;
			width: $typeCenterImageW;
			z-index: 3;
			& video{
				height: $typeCenterImageH;
				width: $typeCenterImageW;
			}
		}
		&.two{
			bottom: $mainImageTwoLeft;
			left: $pad*2;
			width: $typeLeftImage;
			z-index: 2;
		}
	}
	&-right-image{
		right: 0;
		top: 0;
		position: absolute;
		z-index: 0;
    overflow: hidden;
		height: $typeRightImageH;
		width: $typeRightImage;
		&:before{
			content: '';
			display: block;
			left: 0;
			top: 0;
			position: absolute;
			border-left: $typeRightWBlock solid $red;
			border-right: $typeRightWBlock solid transparent;
			border-top: $typeRightHBlock solid transparent;
			height: $typeRightHBlock;
			width: $typeRightWBlock;
		}
	}
	&-title{
		font-size: $h2;
		line-height: 100%;
		text-transform: uppercase;
		position: absolute;
		bottom: $mainImageTwoLeft;
		right: $mainTitleRight;
	}
	&-bottom{
    bottom: $pad*2;
		left: $pad*2;
		display: flex;
		justify-content: space-between;
    position: absolute;
		width: 50.8%;
		z-index: 4;
		*{
			font-size: $h3;
			line-height: 100%;
			text-transform: uppercase;
		}
		&-col{
	    align-items: center;
			display: flex;
			width: 50%;
			& img{
				margin-right: $mainBottomColRight;
				height: $mainColImage;
				width: $mainColImage;
			}
		}
	}
}
</style>
