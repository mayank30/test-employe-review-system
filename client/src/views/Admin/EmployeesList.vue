<template>
  <v-card>
    <v-card-title>
      Employee's ({{ count }})
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        dark
        class="ml-4"
        @click="saveEmployeePopup = true"
      >
        Add Employee
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="primary" dark v-bind="attrs" v-on="on">
              <v-icon small> mdi-dots-vertical </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn
                text
                color="primary"
                @click="reviewAssignModalOpen(item)"
                dark
              >
                Assign Peers for Review
              </v-btn>
            </v-list-item>
            <v-list-item @click="UpdateItem(item)">
              <v-btn text color="primary" dark>
                Edit {{ item.firstName }} Data
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn text color="primary" dark @click="deleteItem(item)">
                Delete {{ item.firstName }} Account
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <v-dialog
      v-model="deleteWarningPopup"
      transition="dialog-bottom-transition"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you sure want to delete?
        </v-card-title>
        <v-card-text>
          <table style="width: 100%">
            <tr>
              <td><b>Name</b></td>
              <td>{{ itemToDelete.firstName }} {{ itemToDelete.lastName }}</td>
            </tr>
            <tr>
              <td><b>Email</b></td>
              <td>{{ itemToDelete.email }}</td>
            </tr>
            <tr>
              <td><b>Created</b></td>
              <td>{{ itemToDelete.createdAt }}</td>
            </tr>
            <tr>
              <td><b>Role</b></td>
              <td>{{ itemToDelete.role }} {{ itemToDelete.status }}</td>
            </tr>
          </table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="darken-1"
            text
            @click="
              deleteWarningPopup = false;
              itemToDelete = {};
            "
          >
            Cancle
          </v-btn>
          <v-btn color="error" @click="deleteItem"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      persistent
      v-model="saveEmployeePopup"
      transition="dialog-top-transition"
      width="500"
    >
      <v-container class="grey lighten-5">
        <h2>Add Employee</h2>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                label="First Name"
                name="firstName"
                type="text"
                v-model="employee.firstName"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Last Name"
                name="lasttName"
                type="text"
                v-model="employee.lastName"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email"
                name="Email"
                type="text"
                v-model="employee.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password"
                name="Password"
                type="text"
                v-model="employee.password"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-radio-group v-model="employee.role" row>
                <v-radio label="ADMIN" value="ADMIN"></v-radio>
                <v-radio label="EMPLOYEE" value="EMPLOYEE"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="fromReset"> Cancle </v-btn>
          <v-btn color="primary" @click="saveEmployee"> Save </v-btn>
        </v-card-actions>
      </v-container>
    </v-dialog>

    <v-dialog
      persistent
      v-model="reviewAssignModal"
      transition="dialog-top-transition"
      width="500"
    >
      <v-container class="grey lighten-5">
        <h2>Review Request</h2>
        <v-form ref="reviewform" v-model="validReview" lazy-validation>
          <v-row no-gutters>
            <!-- <v-col cols="6">
              <v-autocomplete
                v-model="reviewBy"
                :items="items"
                outlined
                dense
                chips
                label="Review By"
                :item-text="'firstName'"
                :item-value="'id'"
              ></v-autocomplete>
            </v-col> -->
            <v-col cols="12">
              <v-autocomplete
                v-model="reviewfor"
                :items="reviewsForList"
                outlined
                dense
                chips
                label="Review For"
                :item-text="'firstName'"
                return-object
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="fromReset2"> Cancle </v-btn>
          <v-btn color="primary" @click="assign"> Assign </v-btn>
        </v-card-actions>
      </v-container>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      mode: "new",
      updatedData: null,
      valid: true,
      deleteWarningPopup: false,
      saveEmployeePopup: false,
      validReview: true,
      reviewAssignModal: false,
      reviewBy: null,
      reviewfor: null,
      search: "",
      count: 0,
      employee: {
        role: "EMPLOYEE",
      },
      headers: [
        {
          text: "First Name",
          value: "firstName",
        },
        {
          text: "Last Name",
          value: "lastName",
        },
        {
          text: "Email",
          value: "email",
        },
        { text: "Role", value: "role" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
      itemToDelete: {},
      reviewsForList: [],
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.$api
        .post(this.$endpoint.GET_ALL_EMPLOYEES, { limit: "100", offset: "0" })
        .then((r) => {
          console.log(r.data.data);
          this.items = r.data.data.rows;
          this.count = r.data.data.count;
        });
    },
    deleteItem(i) {
      if (Object.keys(this.itemToDelete).length > 0) {
        this.$api
          .post(this.$endpoint.DELETE_EMPLOYEE, { id: this.itemToDelete.id })
          .then((r) => {
            this.itemToDelete = {};
            this.deleteWarningPopup = false;
            if (r.data.status) {
              this.$emitter.publish("TOAST", { msg: "Deleted successfully" });
              this.getAll();
            } else {
              this.$emitter.publish("TOAST", { msg: r.data.error });
            }
          });
      } else {
        this.itemToDelete = i;
        this.deleteWarningPopup = true;
      }
    },
    saveEmployee() {
      if (this.mode == "new") {
        this.$api.post(this.$endpoint.REGISTER, this.employee).then((r) => {
          this.saveEmployeePopup = false;
          if (r.data.status) {
            this.getAll();
          } else {
            this.$emitter.publish("TOAST", { msg: r.data.error });
          }
        });
      } else if (this.mode == "update") {
        let employee = {
          id: this.updatedData.id,
          firstName: this.employee.firstName,
          lastName: this.employee.lastName,
          email: this.employee.email,
          password: this.employee.password,
          location:
            this.updatedData.location == null ? " " : this.updatedData.location,
          designation:
            this.updatedData.designation == null
              ? " "
              : this.updatedData.designation,
          role: this.employee.role,
          status: this.updatedData.status,
        };
        console.log(employee);
        this.$api.post(this.$endpoint.UPDATE_EMPLOYEE, employee).then((r) => {
          this.saveEmployeePopup = false;
          if (r.data.status) {
            this.getAll();
          } else {
            this.$emitter.publish("TOAST", { msg: r.data.error });
          }
        });
      }
    },
    UpdateItem(item) {
      console.log(item);
      this.updatedData = item;
      this.employee.firstName = item.firstName;
      this.employee.lastName = item.lastName;
      this.employee.email = item.email;
      this.employee.password = item.password;
      this.employee.role = item.role;
      this.saveEmployeePopup = true;
      this.mode = "update";
    },
    fromReset() {
      this.$refs.form.reset();
      this.saveEmployeePopup = false;
      this.mode = "new";
    },
    assign() {
      let review = {
        reviewById: this.reviewBy,
        reviewFor: this.reviewfor,
      };
      this.$api.post(this.$endpoint.REQUEST_REVIEW, review).then((r) => {
        if (r.data.status) {
          this.fromReset2();
        } else {
          this.$emitter.publish("TOAST", { msg: r.data.error });
        }
      });
    },
    fromReset2() {
      this.$refs.reviewform.reset();
      this.reviewAssignModal = false;
    },
    reviewAssignModalOpen(item) {
      this.reviewBy = item.id;
      this.reviewsForList = this.items.filter((x) => x.id !== item.id);
      this.reviewAssignModal = true;
    },
  },
};
</script>

<style></style>
