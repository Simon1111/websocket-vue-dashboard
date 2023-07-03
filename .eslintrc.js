module.exports = {
	root: true,

	env: {
		node: true,
	},

	extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],

	parserOptions: {
		parser: "babel-eslint",
	},

	rules: {
		indent: ["error", "tab", { VariableDeclarator: 2, SwitchCase: 1 }],
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-irregular-whitespace": "off",
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"], // https://eslint.org/docs/rules/no-mixed-spaces-and-tabs
		"no-unused-vars": [
			process.env.NODE_ENV === "production" ? "error" : "warn",
			{ vars: "all", args: "none" },
		],
		semi: [1, "always"],
		"vue/attributes-order":
			process.env.NODE_ENV === "production" ? "error" : "warn",
		"vue/no-unused-components":
			process.env.NODE_ENV === "production" ? "error" : "warn",
	},

	overrides: [
		{
			files: [
				"**/__tests__/*.{j,t}s?(x)",
				"**/tests/unit/**/*.spec.{j,t}s?(x)",
			],
			env: {
				jest: true,
			},
		},
	],
};
