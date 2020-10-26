<template>
	<header>
		<nav>
			<h1>Chat App</h1>
		</nav>
		<ul>
			<template v-if="!isLoggedIn">
				<li><router-link :to="{ name: 'auth', params: { cState: 'login' } }">Login</router-link></li>
				<li><router-link :to="{ name: 'auth', params: { cState: 'register' } }">Register</router-link></li>
			</template>
			<li v-else><a @click.prevent="logout">Logout</a></li>
		</ul>
	</header>
</template>

<script>
	export default {
		computed: {
			isLoggedIn() {
				return this.$store.getters["user/isAuthenticated"];
			},
		},
		created() {
			console.log("(Header) current Info: ", this.$store.getters["/user/showCurrentUserInfo"]);
		},
		methods: {
			logout() {
				this.$store.dispatch("user/logoutUser");
				this.$router.go();
			},
		},
	};

	// Đang dính ở đây. Không tìm thấy current user info
</script>

<style scoped></style>
