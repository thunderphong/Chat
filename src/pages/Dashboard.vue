<template>
	<h1>DASHBOAD</h1>
	<router-link to="/auth">Auth</router-link>
	<br />
	<router-link to="/">Welcome</router-link>
</template>

<script>
	export default {
		created() {
			console.log("(Dashboard) IsLoggedIn: ", this.$store.getters["user/isAuthenticated"]);
		},
	};
</script>
