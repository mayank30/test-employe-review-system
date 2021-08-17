<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" link :to="item.to">
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Employee Review Rating System</v-toolbar-title>
    </v-app-bar>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  props: {
    source: String,
  },
  data() {
    return {
      isAuthenticate: false,
      dialog: false,
      drawer: null,
      toogle: true,
      parmanent: false,
      mini: false,
      items: [],
    };
  },
  created() {
    try {
      const tokenData = jwt_decode(localStorage.getItem("token"));
      console.log(tokenData);
      if (tokenData.role == "ADMIN") {
        this.items = [
          {
            icon: "mdi-account-group",
            text: "Employees",
            to: "/admin/employees",
          },
          {
            icon: "mdi-card-account-details-star",
            to: "/admin/review",
            text: "Reviews",
          },
          {
            icon: "mdi-logout-variant",
            to: "/logout",
            text: "Logout",
          },
        ];
      } else {
        this.items = [
          {
            icon: "mdi-account-group",
            text: "Feedback",
            to: "/employee/feedback/" + tokenData.id,
          },
          {
            icon: "mdi-logout-variant",
            to: "/logout",
            text: "Logout",
          },
        ];
      }
    } catch {
      this.$router.push("/logout");
    }
  },
};
</script>
