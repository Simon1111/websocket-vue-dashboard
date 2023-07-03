<template>
	<div class="top">
		<div class="row top-row">
			<div class="col top-col">
				today<br />
				{{parse.format(today, 'DD.MM')}}, {{parse.getDay(today)}}
			</div>
			<div class="col top-col">
				tommorow<br />
				{{parse.format(tommorow, 'DD.MM')}}, {{parse.getDay(tommorow)}}
			</div>
			<div class="col top-col">
				aftertommorow<br />
				{{parse.format(afterTommorow, 'DD.MM')}}, {{parse.getDay(afterTommorow)}}
			</div>
		</div>
	</div>
</template>

<script>
import _d from '@/utilitys/date_utils';

export default {
	name: 'Header',

	props: ["today", "tommorow", "afterTommorow"],

	data: () => ({
		parse: _d
	})
}
</script>

<style lang="scss" scoped>
.top {
	background-color: $red;
	background-image: url('~@/assets/svg/bg-main.svg');
	background-position: bottom;
	background-size: cover;
	display: flex;
	height: $headerH;
	*{
		color: $white;
		font-size: $h2;
		text-transform: uppercase;
		line-height: 90%;
		letter-spacing: -0.02em;
		text-transform: uppercase;
	}
	&-row{
    align-items: flex-end;
	}
	&-col{
		padding: 0 $pad $pad*2;
	}
}
</style>
