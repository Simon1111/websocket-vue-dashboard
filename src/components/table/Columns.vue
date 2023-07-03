<template>
	<div :class="`local-time time${isActiveTime(value)
		&& value.type.reversed_order === 0 ? ' active'
		: ''}${isMore && !hide ? ' hide': ''}`">
		<template v-if="value.publish">
			<div class="col-time">
				<img v-if="value.type.icon" :src="value.type.icon" :alt="value.type.full_name" />
			</div>
			<div class="col-time txt-time col-time-txt">
				<span v-if="value.description_ru" v-html="value.description_ru" />
			</div>
			<div class="col-time col-time-status">
				<template v-if="value.status !== NO_STATUS">
					<span v-html="CANCELED" />
				</template>
				<template v-else>
					<span v-if="isActiveTime(value) && value.type.reversed_order === 0" v-html="START" />
					<span
						v-if="isLess15Minutes && value.type.reversed_order === 0"
						v-html="`bla bla<br />${minBeforeStart} bla`" />
					<span v-if="isFinish(value) && value.type.reversed_order === 0" v-html="FINISH" />
					<template v-if="value.type.reversed_order !== 0 || !isLess15Minutes && !isActiveTime(value) && !isFinish(value)">
						<template v-if="manualRegistrationOpen || !manualRegistration && isRegTimeOpen">
							<span
								v-if="spotsLeft > 0 && spotsLeft < 5 && spotsLeft !== ''"
								v-html="`bla ${spotsLeft}<br />bla${spotsLeft === 1 ? 'о' : 'а'}`"
							/>
							<span
								v-if="spotsLeft <= 0 && spotsLeft !== ''"
								v-html="NO_VACANCIES"
							/>
							<span
								v-if="spotsLeft >= 5 && spotsLeft !== ''"
								v-html="REG_OPEN"
							/>
						</template>
						<span v-else v-html="REG_CANCELED" />
					</template>
				</template>
			</div>
			<div class="col-time txt-time col-time-result">
				<span v-if="value" v-html="parseTime(value)" />
			</div>
		</template>
	</div>
</template>

<script>
import _d from '@/utilitys/date_utils';
import { MINUTE, DAY } from '@/constants/date';
import { API_BUBA, INTERVAL_UPD_BUBA, MAX } from '@/constants/index';
import { NO_STATUS,
CANCELED,
START,
FINISH,
NO_VACANCIES,
REG_CANCELED,
REG_OPEN } from '@/constants/statuses';

export default {
	name: "Columns",

	props: {
		value: {
			type: Object,
			default: () => ({})
		},
		isNext: {
			type: Boolean,
			default: false
		},
		length: {
			type: Number,
			default: 0
		}
	},

	data: () => ({
		interval: null,
		now: null,
		MAX,
		NO_STATUS,
		CANCELED,
		START,
		FINISH,
		NO_VACANCIES,
		REG_CANCELED,
		REG_OPEN,
		spotsLeft: '',
		manualRegistration: false,
		manualRegistrationOpen: false,
		registrationStartDate: '',
		registrationEndDate: ''
	}),

	computed: {
		index() {
			return this.$vnode.key;
		},
		hide() {
			const nextHidden = this.length - MAX + 1;
			return this.isNext ? this.index >= nextHidden : this.index < MAX - 1;
		},
		isRegTimeOpen() {
			const startDiff = _d.diff(this.now, this.registrationStartDate, MINUTE);
			const endDiff = _d.diff(this.registrationEndDate, this.now, MINUTE);
			return (!this.registrationStartDate && !this.registrationEndDate)
				|| startDiff > 0 && 0 < endDiff;
		},
		isMore() {
			return this.length > MAX;
		},
		diffStartMin() {
			return _d.diff(this.now, this.value.start_time, MINUTE);
		},
		minBeforeStart() {
			return Math.abs(this.diffStartMin);
		},
		isLess15Minutes() {
			return this.diffStartMin >= -15 && this.diffStartMin < -2;
		}
	},

	methods: {
		async getBubaData() {
			const _ID = this.value.external_id;
			if (_ID === null) return;

			await fetch(`${API_BUBA}${_ID}?language=language%3Dru-RU`)
				.then(response => {
					return response.json();
				})
				.then(data => {
					this.spotsLeft = data.spotsLeft;
					this.registrationStartDate = data.registrationStartDate;
					this.registrationEndDate = data.registrationEndDate;
					this.manualRegistration = data.manualRegistration;
					this.manualRegistrationOpen = data.manualRegistrationOpen;
				});
		},
		async loadDataFromBuba() {
			const _next = this.index + 1;
			const _diff = (_d.diff(this.value.start_time, _d.now(), DAY)) + 1;

			const self = this;
			setTimeout(async function () {
				await self.getBubaData();
			}, 2000 * (_next + _diff));
		},
		isActiveTime(v) {
			const diff = _d.diff(_d.now(), v.start_time, MINUTE);
			const startDiff = _d.diff(v.end_time, _d.now(), MINUTE);
			return diff > -3 && startDiff > 0;
		},
		isFinish(v) {
			const startDiff = _d.diff(v.end_time, _d.now(), MINUTE);
			return startDiff < 0;
		},
		isStart(date) {
			const startDiff = _d.diff(date, _d.now(), MINUTE);
			return startDiff;
		},
		parseTime(date) {
			const start = _d.format(date.start_time, 'HH:mm') ;
			const end = _d.format(date.end_time, 'HH:mm');
			return `${start}<br />${end}`
		}
	},

	beforeDestroy() {
		clearInterval(this.interval)
	},

	created() {
		// update the time every second
		this.interval = setInterval(() => {
			this.now = _d.now();
		}, 1000);
	},

	mounted() {
		this.loadDataFromBuba();
		const self = this;
		setInterval(function() {
			self.loadDataFromBuba();
		}, INTERVAL_UPD_BUBA);
	}
};
</script>

<style lang="scss" scoped>
.local-time{
	&.hide{
		display: none;
	}
}
</style>
