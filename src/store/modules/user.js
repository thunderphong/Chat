export default {
	namespaced: true,
	state() {
		return {
			registerInfo: {},
			currentUserInfo: {},
		};
	},
	mutations: {
		registeringUser(state, data) {
			state.registerInfo = data;
		},
		changeRegisterError(state, data) {
			state.registerError = data;
		},
		changeCurrentUserInfo(state, data) {
			state.currentUserInfo = data;
		},
	},
	actions: {
		async registeringUser(context, data) {
			const commitData = {
				username: data.username.value,
				email: data.email.value,
				password: data.password.value,
			};

			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(commitData),
			});

			const responseData = await response.json();

			if (!response.ok) throw new Error(responseData.error);
			else context.commit("registeringUser", responseData);
		},

		async loginUser(context, data) {
			const commitData = {
				email: data.email.value,
				password: data.password.value,
			};

			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(commitData),
			});

			const responseData = await response.json();

			if (!response.ok) throw new Error(responseData.error);
			else {
				console.log(responseData);
				context.commit("changeCurrentUserInfo", {
					token: responseData.token,
					username: responseData.user.username,
				});
			}
		},
	},
	getters: {
		showRegisterInfo: (state) => {
			return state.registerInfo;
		},
		showCurrentUserInfo: (state) => {
			return state.currentUserInfo;
		},
	},
};
