<template>
	<div class="table-screen">
		<Header
			:today="today"
			:tommorow="tommorow"
			:afterTommorow="afterTommorow" />
		<Body
			:today="today"
			:tommorow="tommorow"
			:afterTommorow="afterTommorow" />
	</div>
</template>

<script>
import _d from '@/utilitys/date_utils';
import Header from "@/components/table/Header";
import Body from "@/components/table/Body";

export default {
	name: "ScreenTable",

	components: { Header, Body },

	computed: {
		today() {
			return _d.now();
		},
		tommorow() {
			return _d.add(_d.now(), 1, 'day');
		},
		afterTommorow() {
			return _d.add(_d.now(), 2, 'day');
		}
	}
};
</script>

<style lang="scss" scoped>
.table-screen {
	width: $vw;
}
</style>
