<template>
  <div class="users">
    <div class="container my-10">
      <div style="width: 300px">
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="my-10"
              v-model="date"
              label="Picker in dialog"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </div>

      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/api.js";
export default {
  name: "Users",

  mounted() {
    this.getUsers();
  },

  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      headers: [
        {
          text: "firstname",
          align: "start",
          value: "firstName",
          sortable: false,
        },
        { text: "lastname", value: "lastName", sortable: false, },
        // { text: "zip code", value: "zipCode" },
        { text: "Phone Number", value: "phoneNumber", sortable: false, },
        { text: "type", value: "type", sortable: false, },
        { text: "location", value: "location", sortable: false, },
        { text: "date", value: "date", sortable: false, },
      ],
      users: [],
      eventId: "",
      event: null,
    };
  },

  methods: {
    async getUsers() {
      const response = await axios.get(`${BASE_URL}users/getusers`);
      this.users = response.data;
    },

    async getEventById() {
      this.event = await axios.get(`${BASE_URL}events/${this.eventId}`);
    },
  },

  watch: {
      date() {
          console.log(this.date);
      }
  }
};
</script>

<style scoped></style>
