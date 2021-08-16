<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title class="mx-auto"></v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" lazy-validation ref="login">
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="employee.email"
                    :rules="[(v) => !!v || 'Email is required']"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="employee.password"
                    :rules="[(v) => !!v || 'Password is required']"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block @click="login" :disabled="!valid" color="primary"
                  >Login</v-btn
                >
              </v-card-actions>
              <v-card-text>
                Don't have any account yet?<router-link to="/registration"
                  >Sign up here</router-link
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      employee: {
        email: "",
        password: "",
      },
      valid: true,
    };
  },
  created() {},
  methods: {
    async login() {
      if (this.$refs.login.validate()) {
        this.$api
          .post(this.$endpoint.LOGIN, this.employee)
          .then((r) => {
            if (r.data.status) {
              this.$emitter.publish("TOAST", {
                msg: `Welcome ${r.data.data.firstName} ${r.data.data.lastName}`,
              });
              localStorage.setItem("token", r.data.data.token);
              if (r.data.data.role == "ADMIN") {
                location.href = "/admin/employees";
              } else {
                location.href = "/employee/feedback";
              }
            } else {
              this.$emitter.publish("TOAST", {
                msg: r.data.error,
                error: true,
              });
            }
          })
          .catch((e) => {
            this.$emitter.publish("TOAST", { msg: e });
          });
      }
    },
  },
};
</script>
