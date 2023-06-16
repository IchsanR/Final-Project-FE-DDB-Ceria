/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/**/*.{js,ts,jsx,tsx,mdx}",
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
		"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
	],
	important: true,
	plugins: [
		require('flowbite/plugin')
	],
};
