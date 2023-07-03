<template>
	<div class="main">
		<img src="@/assets/svg/logo.svg" alt="" class="main-logo" />
		<Type v-for="(t, i) in filtredTypes" :key="i" :value="t" :activeSlide="activeSlide" />
		<div class="main-qr">
			<img src="@/assets/svg/qr-2.svg" alt="" />
			<div v-html="'buba.com/ru/experiences'" />
		</div>
		<h1 class="main-title" v-html="'BlaBla<br />BlaBla'" />
	</div>
</template>

<script>
import { API_BUBAPUPER, SEC_SLIDE_CHANGE } from '@/constants/index';
import Type from "@/components/main/Type";

export default {
	name: 'ScreenMain',

	components: {
		Type
	},

	data: () => ({
		activeSlide: 0,
		types: []
	}),

	computed: {
		filtredTypes() {
			return this.types.filter(e => e.show_in_schedule);
		}
	},

	methods: {
		async loadTypesData() {
			return await fetch(`${API_BUBAPUPER}dashboard/event_types/`)
				.then(response => {
					return response.json();
				});
		},

		changeSlide() {
			const self = this;
			const SEC = SEC_SLIDE_CHANGE;
			setInterval(function() {
				let _next = ++self.activeSlide;
				self.activeSlide = _next !== self.filtredTypes.length ? _next : 0;
			}, SEC);
		}
	},

	async mounted() {
		this.types = await this.loadTypesData();
		this.changeSlide();
	}
}
</script>

<style lang="scss" scoped>
.main {
	box-sizing: border-box;
	background-color: $red;
	padding: $pad*2;
	position: relative;
	height: $vh;
	width: 100%;
	*{
		color: $white;
	}
	&-logo{
		position: absolute;
		left: $pad*2;
		top: $mainLogoTop;
		width: $mainLogoW;
		z-index: 5;
	}
	&-title{
		font-size: $h2;
		line-height: 100%;
		text-transform: uppercase;
		position: absolute;
		bottom: $mainTitleBottom;
		right: $mainTitleRight;
		z-index: 5;
	}
	&-qr{
    align-items: center;
    bottom: $mainQRBottom;
		display: flex;
		left: $mainQRLeft;
		position: absolute;
		z-index: 5;
		*{
			font-size: $h3;
			line-height: 100%;
			text-transform: uppercase;
		}
		& img{
			margin-right: $mainQRImageRight;
			height: $mainQRImage;
			width: $mainQRImage;
		}
	}
}
</style>
