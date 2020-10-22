<template>
	<div>
		<div class="main-content">
			<!-- Register -->
			<form class="form-register" v-if="isRegister" @submit.prevent="submitRegister">
				<div class="form-register-with-email">
					<div class="form-white-background">
						<div class="form-title-row">
							<h1>Create an account</h1>
						</div>

						<!-- Username input -->
						<p v-if="!registeredData.username.isValid" class="invalidMessage">
							{{ registerError.username }}
						</p>
						<div class="form-row" :class="{ invalid: !registeredData.username.isValid }">
							<label>
								<span>Username</span>
								<input
									type="text"
									name="name"
									v-model.trim="registeredData.username.value"
									@blur="clearValidate('registeredData', 'username')"
								/>
							</label>
						</div>

						<!-- Email input -->
						<p v-if="!registeredData.email.isValid" class="invalidMessage">
							{{ registerError.email }}
						</p>
						<div class="form-row" :class="{ invalid: !registeredData.email.isValid }">
							<label>
								<span>Email</span>
								<input
									type="email"
									name="email"
									v-model.trim="registeredData.email.value"
									@blur="clearValidate('registeredData', 'email')"
								/>
							</label>
						</div>

						<!-- Password input -->
						<p v-if="!registeredData.password.isValid" class="invalidMessage">
							{{ registerError.password }}
						</p>
						<div class="form-row" :class="{ invalid: !registeredData.password.isValid }">
							<label>
								<span>Password</span>
								<input
									type="password"
									name="password"
									v-model="registeredData.password.value"
									@blur="clearValidate('registeredData', 'password')"
								/>
							</label>
						</div>

						<!-- <div class="form-row">
							<label>
								<span>Confirm pw</span>
								<input type="password" name="confirmPassword" />
							</label>
						</div> -->

						<!-- Agreement checkbox -->
						<div class="form-row">
							<label class="form-checkbox">
								<input type="checkbox" name="checkbox" checked />
								<span>I agree to the <a href="#">terms and conditions</a></span>
							</label>
						</div>
						<my-button> Register </my-button>
					</div>

					<a @click="changeRState" class="form-log-in-with-existing">
						Already have an account? Login here &rarr;
					</a>
				</div>
			</form>

			<!-- Login -->
			<form v-else class="form-register" @submit.prevent="submitLogin">
				<div class="form-register-with-email">
					<div class="form-white-background">
						<div class="form-title-row">
							<h1>Log in</h1>
						</div>

						<div class="form-row line" v-if="isRedirect">
							<p>You've sucessfully registered! Now let's login with your account!</p>
						</div>

						<!-- Email input -->
						<p v-if="!loginData.email.isValid" class="invalidMessage">
							{{ loginError.email }}
						</p>
						<div class="form-row" :class="{ invalid: !loginData.email.isValid }">
							<label>
								<span>Email</span>
								<input
									type="email"
									name="email"
									v-model.trim="loginData.email.value"
									@blur="clearValidate('loginData', 'email')"
								/>
							</label>
						</div>

						<!-- Password input -->
						<p v-if="!loginData.password.isValid" class="invalidMessage">
							{{ loginError.password }}
						</p>
						<div class="form-row" :class="{ invalid: !loginData.password.isValid }">
							<label>
								<span>Password</span>
								<input
									type="password"
									name="password"
									v-model="loginData.password.value"
									@blur="clearValidate('loginData', 'password')"
								/>
							</label>
						</div>

						<div class="form-row">
							<my-button>Log in</my-button>
						</div>
					</div>

					<a class="form-log-in-with-existing" @click="changeRState"
						>Doesn't have an account? Create an account here! &rarr;</a
					>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			cState: {
				type: String,
				required: false,
				default: "login",
			},
		},
		data() {
			return {
				isRegister: true,
				isRedirect: false,
				rInfoIsValid: null,
				lInfoIsValid: null,
				registeredData: {
					username: { value: "", isValid: true },
					email: { value: "", isValid: true },
					password: { value: "", isValid: true },
				},
				loginData: {
					email: { value: "", isValid: true },
					password: { value: "", isValid: true },
				},
				registerError: {
					username: "",
					email: "",
					password: "",
				},
				loginError: {
					email: "",
					password: "",
				},
			};
		},
		created() {
			if (this.cState == "login") this.isRegister = false;
		},
		methods: {
			// In common
			clearValidate(field, input) {
				this[field][input].isValid = true;
			},
			changeRState() {
				this.isRegister = !this.isRegister;
			},
			redirectAndFill() {
				this.isRedirect = true;
				this.loginData.email.value = this.registeredData.email.value;
				this.loginData.password.value = this.registeredData.password.value;
			},

			// For Register
			validateRegisterForm() {
				this.rInfoIsValid = true;
				if (this.registeredData.username.value == "" || this.registeredData.username.value.length < 6) {
					this.registeredData.username.isValid = !this.registeredData.username.isValid;
					this.registerError.username = "Username must not be empty and must have more than 5 character!";
					this.rInfoIsValid = !this.rInfoIsValid;
				}

				if (this.registeredData.email.value == "") {
					this.registeredData.email.isValid = !this.registeredData.email.isValid;
					this.registerError.email = "Email must not be empty";
					this.rInfoIsValid = !this.rInfoIsValid;
				}

				if (this.registeredData.password.value == "" || this.registeredData.password.value.length < 6) {
					this.registeredData.password.isValid = !this.registeredData.password.isValid;
					this.registerError.password = "Password must not be empty and must have more than 5 character!";
					this.rInfoIsValid = !this.rInfoIsValid;
				}
			},
			async submitRegister() {
				this.validateRegisterForm();
				if (!this.rInfoIsValid) return;
				try {
					await this.$store.dispatch("user/registeringUser", this.registeredData);
					this.clearValidate("registeredData", "username");
					this.isRegister = false;
					this.redirectAndFill();
				} catch (err) {
					this.registeredData.username.isValid = false;
					this.registerError.username = err;
				}
			},

			// For Login
			validateLoginForm() {
				this.lInfoIsValid = true;
				if (this.loginData.email.value == "") {
					this.loginData.email.isValid = !this.loginData.email.isValid;
					this.loginError.email = "Email must not be empty!";
					this.lInfoIsValid = !this.lInfoIsValid;
				}

				if (this.loginData.password.value == "") {
					this.loginData.password.isValid = !this.loginData.password.isValid;
					this.loginError.password = "Password must not be empty!";
					this.lInfoIsValid = !this.lInfoIsValid;
				}
			},
			async submitLogin() {
				this.validateLoginForm();
				if (!this.lInfoIsValid) return;
				try {
					await this.$store.dispatch("user/loginUser", this.loginData);
					console.log("Current: ", this.$store.getters["user/showCurrentUserInfo"]);
					this.clearValidate("loginData", "email");
				} catch (err) {
					this.loginData.email.isValid = false;
					this.loginError.email = err;
				}
			},
		},
	};
</script>

<style scoped>
	.main-content {
		margin-top: 50px;
	}
	.form-register {
		max-width: 1000px;
		width: 100%;
		margin: 0 auto;
		text-align: center;
	}

	.form-register-with-email {
		position: relative;
		display: inline-block;
		vertical-align: top;
		text-align: center;
	}

	.form-register-with-email .form-white-background {
		width: 570px;
		box-sizing: border-box;
		background-color: #ffffff;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
		padding: 60px 80px;
		margin-bottom: 35px;
	}

	.form-register-with-email .form-row {
		text-align: left;
		margin-bottom: 23px;
	}

	.form-register-with-email .form-title-row {
		text-align: center;
		margin-bottom: 50px;
	}

	.form-register-with-email h1 {
		display: inline-block;
		box-sizing: border-box;
		color: #4c565e;
		font-size: 24px;
		padding: 0 20px 15px;
		border-bottom: 2px solid #6caee0;
		margin: 0;
	}

	.form-register-with-email .form-row > label span {
		display: inline-block;
		box-sizing: border-box;
		color: #5f5f5f;
		width: 125px;
		text-align: right;
		padding-right: 25px;
	}

	.form-register-with-email input {
		color: #5f5f5f;
		box-sizing: border-box;
		width: 230px;
		box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.08);
		padding: 12px 18px;
		border: 1px solid #dbdbdb;
	}

	.form-register-with-email .form-checkbox input {
		margin-left: 128px;
		margin-right: 10px;
		width: auto;
		vertical-align: top;
	}

	.form-register-with-email .form-row .form-checkbox span {
		font-size: 12px;
		font-weight: normal;
		display: inline-block;
		text-align: left;
		width: 220px;
		margin: 0;
	}

	.form-register-with-email .form-checkbox span a {
		text-decoration: none;
		color: #6caee0;
	}

	.form-register-with-email .form-log-in-with-existing {
		text-decoration: none;
		padding: 4px 8px;
		font-weight: normal;
		color: #7b9d62;
		background-color: #d6f0c3;
		cursor: pointer;
	}

	.form-register-with-email .invalid input {
		border: 1px solid red;
	}

	.form-register-with-email .invalidMessage {
		font-size: 12px;
		font-weight: normal;
		display: inline-block;
		/* text-align: center; */
		width: 220px;
		margin: 0;
		color: red;
		padding: 0;
	}

	.form-register-with-email .line {
		font-size: 12px;
		color: green;
		text-align: center;
	}
</style>
