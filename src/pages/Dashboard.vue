<template>
	<the-header></the-header>
	<div class="container-fluid">
		<div class="row d-flex">
			<chat-list class="col-sm-4 border border-light bg-light float-left"></chat-list>
			<chat-field class="col-sm-8 border border-light bg-light float-left"></chat-field>
		</div>
	</div>
	<h1>aaaa</h1>
</template>

<script>
	import ChatList from "../components/MainArea/ChatList.vue";
	import ChatField from "../components/MainArea/ChatField.vue";

	export default {
		components: {
			"chat-list": ChatList,
			"chat-field": ChatField,
		},
	};
</script>

<style scoped>
	html,
	body {
		height: 100vh;
	}
	.card-body {
		max-height: 100vh;
	}
</style>
