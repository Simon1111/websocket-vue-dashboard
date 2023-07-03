<template>
	<div class="body">
		<div class="row" v-if="activities.length">
			<div v-for="(el, i) in arrDays" :key="`${i}-event`" class="col body-col">
				<template v-if="el.all.length">
					<div :class="{'col-reverse': isNext && el.all.length > MAX}">
						<div>
							<Columns
								v-for="(a, i) in (el.all.length <= MAX ? el.same : el.all)"
								:key="i"
								:value="a"
								:isNext="isNext"
								:length="el.all.length"
							/>
						</div>
						<template v-if="el.all.length - MAX + 1 < 0">
							<div
								v-for="i in -(el.all.length - MAX + 1)"
								:key="`${i}-empty`"
								class="time"
							/>
						</template>
						<div class="show-more time" v-if="el.all.length > MAX">
							<template>
								<div class="col-time">
									<img src="@/assets/svg/plus.svg" alt="" />
								</div>
								<div class="col-time txt-time col-time-txt">
									<span>bla {{el.all.length - MAX + 1}}<br />bla</span>
								</div>
							</template>
						</div>
					</div>
					<div v-if="el.all.length <= MAX">
						<Columns
							v-for="(a, i) in el.other"
							:key="i + el.same.length"
							:value="a"
						/>
						<div class="time" />
					</div>
				</template>
				<div v-else
					class="no-activities"
					v-html="'bla bla bla'"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import _d from '@/utilitys/date_utils';
import { API_BUBAPUPER, SEC_DAY_CHANGE, INTERVAL_UPD_APP, MAX }
	from '@/constants/index';
import Columns from './Columns';

export default {
	name: 'Body',

	props: ["today", "tommorow", "afterTommorow"],

	components: {
		Columns
	},

	data: () => ({
		MAX,
		isNext: false,
		activities: []
	}),

	computed: {
		_today() {
			return _d.format(this.today, 'YYYY-MM-DD');
		},
		_tommorow() {
			return _d.format(this.tommorow, 'YYYY-MM-DD');
		},
		_afterTommorow() {
			return _d.format(this.afterTommorow, 'YYYY-MM-DD');
		},
		arrDays() {
			const allTD = this.getEvents(this._today);
			const allTM = this.getEvents(this._tommorow);
			const allAT = this.getEvents(this._afterTommorow);
			const getLeg = (arg, hidden) => {
				const a = (a) => a.type.reversed_order === 0;
				const b = (b) => b.type.reversed_order !== 0;
				return arg.filter(hidden ? b : a);
			};
			const _obj = (day, arr) => (
				{
					date: day,
					same: getLeg(arr),
					other: getLeg(arr, true),
					all: arr
				}
			);

			return [_obj(this._today, allTD), _obj(this._tommorow, allTM), _obj(this._afterTommorow, allAT)]
		}
	},

	methods: {
		loadActivities(date = this._today) {
			return fetch(`${API_BUBAPUPER}dashboard/schedule/?start_time__date=${date}`)
				.then(response => {
					return response.json();
				});
		},

		swithIntervalIsNext() {
			const self = this;
			setInterval(() => { self.isNext = !self.isNext }, SEC_DAY_CHANGE);
		},

		getEvents(date) {
			const act = this.activities.filter(a => a.date === date)[0];
			// /** slice - need for hack vue render bug
			//  * "You may have an infinite update loop in a component render function."
			//  *  */
			let sortEvents;
			if (act) {
				sortEvents = act.events.slice().sort((a, b) => a.type.reversed_order - b.type.reversed_order);
			}
			return act ? sortEvents : [];
		},

		updateActInterval() {
			const self = this;
			setInterval(function() {
				self.loadActs();
			}, INTERVAL_UPD_APP);
		},

		async loadActs() {
			this.activities = [
				...(await this.loadActivities()),
				...(await this.loadActivities(this._tommorow)),
				...(await this.loadActivities(this._afterTommorow))
			];
		}
	},

	async mounted() {
		await this.updateActInterval();
		await this.loadActs();
		this.swithIntervalIsNext();
	}
}
</script>

<style lang="scss" scoped>
.body {
	background: $grey;
	height: $vh - $headerH;
	*{
		color: $white;
	}
	&-col{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
}
.active{
	background-color: $red-dark;
}
.show-more{
	*{
		color: $red;
	}
}
.col-reverse{
	display: flex;
	flex-direction: column-reverse;
}
.no-activities{
	align-items: center;
	justify-content: center;
	display: flex;
	font-size: $h4;
	text-align: center;
	height: 100%;
}
.col-time{
	&-txt{
		margin-right: $pad;
		width: $colTimeTxtW;
	}
	&-status{
		font-size: $h4;
		line-height: 90%;
		text-transform: lowercase;
		margin-right: $pad;
		height: 100%;
		width: $colTimeStatusW;
	}
	&-result{
		width: $colTimeResultW;
	}
}
</style>
