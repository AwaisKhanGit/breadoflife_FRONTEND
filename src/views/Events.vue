<template>
  <div class="container">
    <v-data-table :headers="headers" :items="events" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                <span class="material-icons"> add </span>
                New event
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.type"
                        label="type"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.location"
                        label="location"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.date"
                            label="date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete event?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// import { END_POINTS, createApiEndPoints } from "@/api.js";
import axios from "axios";

export default {
  name: "Events",
  mounted() {
    this.initialize();
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Type",
          align: "start",
          value: "type",
          sortable: false,
        },
        { text: "Location", value: "location", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      events: [],
      editedIndex: -1,
      editedItem: {
        _id: "",
        type: "",
        location: "",
        date: "",
      },
      defaultItem: {
        _id: "",
        type: "",
        location: "",
        date: "",
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Event" : "Edit Event";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    initialize() {
      axios
        .get("http://localhost:3001/events")
        .then((response) => {
          this.events = response.data;
          this.events.forEach((ev) => {
            ev.date = ev.date.split("T")[0];
          });
        })
        .catch((err) => console.log(err));
    },

    editItem(item) {
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log("id : " + this.editedItem._id);
      axios
        .delete(`http://localhost:3001/events/${this.editedItem._id}`)
        .then((response) => {
          this.events.splice(this.editedIndex, 1);
          console.log(response);
        })
        .catch((err) => console.log(err));
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        axios
          .patch(`http://localhost:3001/events/${this.editedItem._id}`, {
            type: this.editedItem.type,
            location: this.editedItem.location,
            date: new Date(this.editedItem.date),
          })
          .then(() => {
            Object.assign(this.events[this.editedIndex], this.editedItem);
            this.close();
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(`http://localhost:3001/events`, {
            type: this.editedItem.type,
            location: this.editedItem.location,
            date: new Date(this.editedItem.date),
          })
          .then(() => {
            console.log(this.editedItem);
            this.events.push(this.editedItem);
            this.close();
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
