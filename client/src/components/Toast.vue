<template>
  <v-snackbar
    :timeout="toast.timeout || -1"
    v-model="show"
    center
    :color="error ? 'error' : 'primary'"
    bottom
    text
  >
    <div style="text-align: center">{{ toast.msg }}</div>
  </v-snackbar>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      toast: {
        msg: "",
        timeout: 5000,
      },
      show: false,
      error: false,
    };
  },
  mounted() {
    this.$emitter.subscribe("TOAST", (d) => {
      this.toast = {
        timeout: 5000,
        msg: "",
      };
      this.toast = { ...this.toast, ...d };
      this.error = false;
      if (d.error && d.error == true) {
        this.error = true;
      }
      this.show = true;
    });
  },
};
</script>
