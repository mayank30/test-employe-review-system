<template>
  <div>Logging Out...</div>
</template>

<script>
export default {
  created() {
    localStorage.clear();
    this.$router.push("/");
    this.$emitter.publish("TOAST", {
      msg: "Logged out !",
    });
  },
};
</script>
