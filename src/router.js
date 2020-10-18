import { createRouter, createWebHistory } from "vue-router";

import NotFound from "./pages/notFound.vue";
import Test from "./pages/test.vue";
import Welcome from "./pages/Welcome.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", redirect: "/welcome" },
		{ path: "/welcome", component: Welcome },
		{ path: "/auth", component: Test },

		{ path: "/dashboard", component: null },

		{ path: "/:notFound(.*)*", component: NotFound },
	],
});

export default router;
