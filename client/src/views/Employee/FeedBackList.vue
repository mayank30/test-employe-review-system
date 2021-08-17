<template>
  <div>
    <div v-if="!dataFetched" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <h3>List Reviews Assigned</h3>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            color="primary"
            v-if="item.comment === '' || item.comment === null"
            @click="startReview(item)"
          >
            Submit Review
          </v-btn>
        </template>
      </v-data-table>

      <v-dialog
        persistent
        v-model="showCommentPopup"
        transition="dialog-top-transition"
        width="500"
      >
        <v-container class="grey lighten-5">
          <h2>Add Comment</h2>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  label="Comment"
                  name="comment"
                  type="text"
                  v-model="employeeToReview.comment"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Rating (1 low -10 high)"
                  name="rating"
                  type="text"
                  v-model="employeeToReview.rating"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="
                showCommentPopup = false;
                employeeToReview = {};
              "
            >
              Cancle
            </v-btn>
            <v-btn color="primary" @click="submitReview"> Submit </v-btn>
          </v-card-actions>
        </v-container>
      </v-dialog>
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
          text: "Peer Review For",
          value: "reviewFor.firstName",
        },
        {
          text: "Email",
          value: "reviewFor.email",
        },
        {
          text: "Comment",
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
      employeeToReview: { id: "", comment: "", rating: "" },
      items: [],
      showCommentPopup: false,
    };
  },
  async created() {
    const res = await this.$api.post(
      this.$endpoint.GET_ALL_REVIEWS_BY_EMPLOYEE,
      {
        limit: "100",
        offset: "0",
        id: this.$router.currentRoute.params.id,
      }
    );
    console.log(res);
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
  methods: {
    startReview(i) {
      this.employeeToReview = i;
      this.showCommentPopup = true;
    },
    async submitReview() {
      const res = await this.$api.post(this.$endpoint.SUBMIT_REVIEW, {
        id: this.employeeToReview.id,
        comment: this.employeeToReview.comment,
        rating: this.employeeToReview.rating,
      });
      console.log(res);
      if (res.data.status) {
        this.$emitter.publish("TOAST", {
          msg: "Done",
        });
      } else {
        this.$emitter.publish("TOAST", {
          msg: res.data.error,
          error: true,
        });
      }
      this.showCommentPopup = false;
    },
  },
};
</script>

<style></style>
