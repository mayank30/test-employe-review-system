<template>
  <div>
    <div v-if="!dataFetched" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>List</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataFetched: false,
    };
  },
  async created() {
    // await this.$api.get(this.$endpoint.)
    this.dataFetched = true;
  },
};
</script>

<style></style>
