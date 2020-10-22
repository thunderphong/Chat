<template>
	<button v-if="!link">
		<slot></slot>
	</button>
	<router-link v-else :to="to">
		<button><slot></slot></button>
	</router-link>
</template>

<script>
	export default {
		props: {
			link: {
				type: Boolean,
				required: false,
				default: false,
			},
			to: {
				type: String,
				required: false,
				default: "/",
			},
		},
	};
</script>

<style scoped>
	button {
		display: block;
		border-radius: 2px;
		background-color: #6caee0;
		color: #ffffff;
		font-weight: bold;
		box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.08);
		padding: 15px 35px;
		border: 0;
		margin: 55px auto 0;
		cursor: pointer;
	}

	a {
		text-decoration: none;
	}
</style>
