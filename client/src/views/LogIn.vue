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
                    v-model="user.username"
                    :rules="[(v) => !!v || 'User name is required']"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="user.password"
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
import axios from "@/service/axios.js";
export default {
  data() {
    return {
      user: {},
      valid: true,
    };
  },
  methods: {
    async login() {
      if (this.$refs.login.validate()) {
        await axios
          .login(this.user)
          .then((e) => {
            localStorage.setItem("_gxcd", e.data.access);
            localStorage.setItem("logged", true);
            this.$router.push("/dashboard/overview");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
