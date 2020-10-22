import { createRouter, createWebHistory } from "vue-router";

import NotFound from "./pages/notFound.vue";
import Auth from "./pages/Auth.vue";
import Welcome from "./pages/Welcome.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", redirect: "/welcome" },
		{ path: "/welcome", component: Welcome },
		{ path: "/auth", name: "auth", component: Auth, props: true },
		{ path: "/dashboard", component: null },
		{ path: "/:notFound(.*)*", component: NotFound },
	],
});

export default router;
