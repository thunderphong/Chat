import { createStore } from "vuex";

import chatModule from "./modules/chat.js";
import userModule from "./modules/user.js";

const store = createStore({
	modules: {
		chat: chatModule,
		user: userModule,
	},
	state() {
		return {};
	},
	mutations: {},
	getters: {},
});

export default store;
