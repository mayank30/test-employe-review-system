<template>
  <v-app>
    <v-main>
      <router-view :key="$route.fullPath"> </router-view>
    </v-main>
    <toast />
  </v-app>
</template>

<script>
import Toast from "./components/Toast.vue";
export default {
  components: { Toast },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
