import { createRouter, createWebHistory } from "vue-router";

import NotFound from "./pages/notFound.vue";
import Auth from "./pages/Auth.vue";
import Welcome from "./pages/Welcome.vue";
import DashBoard from "./pages/Dashboard.vue";
import store from "./store/index.js";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", redirect: "/welcome" },
		{ path: "/welcome", component: Welcome },
		{
			path: "/auth",
			name: "auth",
			component: Auth,
			props: true,
			meta: {
				unRequiredAuth: true,
			},
		},
		{
			path: "/dashboard",
			component: DashBoard,
			meta: { requiredAuth: true },
		},
		{ path: "/:notFound(.*)*", component: NotFound },
	],
});

router.beforeResolve((to, _, next) => {
	const isToken = store.getters["user/isAuthenticated"];
	if (to.meta.requiredAuth && !isToken) next("/auth");
	else if (to.meta.unRequiredAuth && isToken) next("/dashboard");
	else next();
});

export default router;
