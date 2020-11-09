<template>
	<header>
		<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
			<router-link to="/" class="navbar-brand"><h1>Chat App</h1></router-link>
			<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
				<ul class="navbar-nav">
					<template v-if="!isLoggedIn">
						<li class="nav-item">
							<router-link class="nav-link" :to="{ name: 'auth', params: { cState: 'login' } }"
								>Login</router-link
							>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" :to="{ name: 'auth', params: { cState: 'register' } }"
								>Register</router-link
							>
						</li>
					</template>
					<li v-else class="nav-item">
						<router-link to="#" class="nav-link" @click.prevent="logout">Logout</router-link>
					</li>
					<li class="nav-item"><router-link to="/" class="nav-link">Welcome</router-link></li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
	export default {
		computed: {
			isLoggedIn() {
				return this.$store.getters["user/isAuthenticated"];
			},
		},
		methods: {
			logout() {
				this.$store.dispatch("user/logoutUser");
				this.$router.go();
			},
		},
	};

	// Bắt đầu làm chat
</script>

<style scoped>
	h1 {
		font-size: 1.5rem;
	}
</style>
