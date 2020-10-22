<template>
	<header>
		<nav>
			<h1>Chat App</h1>
		</nav>
		<ul>
			<li><router-link :to="{ name: 'auth', params: { cState: 'login' } }">Login</router-link></li>
			<li><router-link :to="{ name: 'auth', params: { cState: 'register' } }">Register</router-link></li>
		</ul>
	</header>
</template>

<style scoped></style>
