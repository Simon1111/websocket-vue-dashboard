export const API_BUBAPUPER = process.env.VUE_APP_BUBAPUPER_API;
export const API_BUBA = process.env.VUE_APP_BUBA_API;

// 20.37 - header
// 8.3 - time block
var _w = window.innerWidth;
var _h = window.innerHeight;
var _itemBlock = (_w / 100) * 4.68;
var _headerBlock = (_h / 100) * 20.37;
var _diff = ((_h - _headerBlock) / _itemBlock) - 2;

export const MAX = Math.round(_diff);

export const SEC_SLIDE_CHANGE = process.env.VUE_APP_SEC_SLIDE_CHANGE;
export const SEC_DAY_CHANGE = process.env.VUE_APP_SEC_DAY_CHANGE;
export const INTERVAL_UPD_BUBA = process.env.VUE_APP_INTERVAL_UPD_BUBA; // 5 min
export const INTERVAL_UPD_APP = process.env.VUE_APP_INTERVAL_UPD_APP;
