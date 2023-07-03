module.exports = {
	lintOnSave: false,
	//filenameHashing: false,
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/assets/styles/_variables.scss";`,
			},
		},
	},
	devServer: {
		disableHostCheck: true,
	},
};
