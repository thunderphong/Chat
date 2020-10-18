<template>
	<h2>Nothing's here! Link: {{ test }}</h2>
</template>

<script>
	export default {
		computed: {
			test() {
				return this.$route.params;
			},
		},
	};
</script>
