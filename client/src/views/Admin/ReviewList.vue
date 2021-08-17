<template>
  <div>
    <div v-if="!dataFetched" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <h3>Rating and Review for - {{ $router.currentRoute.params.name }}</h3>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <div v-if="item.status !== 'PENDING'">
            <v-btn
              small
              v-show="item.status === 'REJECT' || item.status === 'SUBMITTED'"
              color="success"
              @click="processReview({ id: item.id, status: 'APPROVE' })"
            >
              Approve
            </v-btn>
            <v-btn
              small
              v-show="item.status === 'APPROVE' || item.status === 'SUBMITTED'"
              color="error"
              @click="processReview({ id: item.id, status: 'REJECT' })"
            >
              Reject
            </v-btn>
          </div>
          <div v-else>Pending Submission</div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataFetched: false,
      headers: [
        {
          text: "Peer By",
          value: "reviewFor.firstName",
        },
        {
          text: "Email",
          value: "reviewFor.email",
        },
        {
          text: "Review",
          value: "comment",
        },
        {
          text: "Rating",
          value: "rating",
        },
        {
          text: "Status",
          value: "status",
        },
        { text: "", value: "actions" },
      ],
      items: [],
    };
  },
  async created() {
    await this.init();
  },
  methods: {
    async init() {
      const res = await this.$api.post(
        this.$endpoint.GET_ALL_REVIEWS_BY_EMPLOYEE,
        {
          limit: "100",
          offset: "0",
          id: this.$router.currentRoute.params.id,
        }
      );
      if (res.data.status) {
        this.items = res.data.data.rows;
      } else {
        this.$emitter.publish("TOAST", {
          msg: res.data.error,
          error: true,
        });
      }
      this.dataFetched = true;
    },
    async processReview(i) {
      const res = await this.$api.post(this.$endpoint.PROCESS_REVIEW, i);
      if (res.data.status) {
        this.$emitter.publish("TOAST", {
          msg: "Review status updated to - " + i.status,
        });
        await this.init();
      } else {
        this.$emitter.publish("TOAST", {
          msg: res.data.error,
          error: true,
        });
      }
    },
  },
};
</script>

<style></style>
