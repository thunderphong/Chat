export default {
	namespaced: true,
	state() {
		return {
			registerInfo: {},
		};
	},
	mutations: {
		registeringUser(state, data) {
			state.registerInfo = data;
		},
	},
	actions: {
		registeringUser(context, data) {
			context.commit("registeringUser", data);
		},
	},
	getters: {
		showRegisterInfo: (state) => {
			return state.registerInfo;
		},
	},
};
