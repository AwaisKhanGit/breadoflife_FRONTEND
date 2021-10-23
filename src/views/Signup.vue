<template>
  <div class="signup my-10">
    <div class="container">
      <h4 class="text-h4 primary--text mb-10">Distribution Sign-Up</h4>
      <v-form ref="formSignup" style="width: 500px">
        <div>
          <p>
            <span>from which distribution are you signing up?</span>
          </p>
          <v-radio-group v-model="q0">
            <v-radio
              v-for="(item, index) in eventTypes"
              :key="index"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </div>

        <div class="row my-10">
          <div class="col-sm-12">
            <v-text-field
              label="firstname"
              v-model="q1"
              :rules="inputRule"
            ></v-text-field>
          </div>
        </div>

        <div class="row my-10">
          <div class="col-sm-12">
            <v-text-field
              label="lastname"
              v-model="q2"
              :rules="inputRule"
            ></v-text-field>
          </div>
        </div>

        <div class="row my-10">
          <div class="col-sm-12">
            <v-text-field
              label="phone number"
              v-model="q3"
              :rules="inputRule"
            ></v-text-field>
          </div>
        </div>

        <div class="row my-10">
          <div class="col-sm-12">
            <p>how did you hear about our distribution ?</p>
            <p class="caption">check all that apply</p>
          </div>
          <div class="col-sm-12">
            <v-checkbox
              v-for="(item, index) in socials"
              :key="index"
              v-model="q4"
              :label="item"
              :value="item"
            ></v-checkbox>
          </div>
          <div class="col-sm-12">
            <v-text-field label="Other" v-model="otherSocials"></v-text-field>
          </div>
        </div>

        <div class="row my-10">
          <div class="col-sm-12">
            <v-text-field
              label="zip code"
              v-model="q5"
              :rules="inputRule"
            ></v-text-field>
          </div>
        </div>

        <div class="row my-10">
          <div class="col-sm-12">
            <p>Would you like the COVID vaccine on during the distribution</p>
            <p class="caption">
              During the distribution we will also provide free COVID vaccines
              on the campus.
            </p>
          </div>
          <div class="col-sm-12">
            <v-radio-group v-model="q6">
              <v-radio
                v-for="(item, index) in yesNo"
                :key="index"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>

        <div class="row my-10" v-if="show7">
          <div class="col-sm-12">
            <p>Which COVID vaccine would you prefer to receive?</p>
          </div>
          <div class="col-sm-12">
            <v-radio-group v-model="q7">
              <v-radio
                v-for="(item, index) in vaccine"
                :key="index"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>

        <div class="row my-10">
          <div class="col-sm-12">
            <p>Have you recieved the COVID vaccine ?</p>
          </div>
          <div class="col-sm-12">
            <v-radio-group v-model="q8">
              <v-radio
                v-for="(item, index) in yesNo"
                :key="index"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>

        <p>Additional supportive services</p>

        <div class="row my-10">
          <div class="col-sm-12">
            <p>
              Are you in need of additional supportive services (e.g., utility
              assistance, rental assistance, housing, nutritional support,
              etc.)?
            </p>
          </div>
          <div class="col-sm-12">
            <v-radio-group v-model="q9">
              <v-radio
                v-for="(item, index) in yesNo"
                :key="index"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>

        <p>Additional information</p>

        <div class="row my-10">
          <div class="col-sm-12">
            <v-text-field
              label="Number of Children In Household"
              v-model="q10"
              :rules="inputRule"
            ></v-text-field>
          </div>
        </div>

        <div class="row my-10">
          <div class="col-sm-12">
            <p>Are you or anyone in your household 65+ in age?</p>
          </div>
          <div class="col-sm-12">
            <v-radio-group v-model="q11">
              <v-radio
                v-for="(item, index) in yesNo"
                :key="index"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>

        <div class="row my-10">
          <div class="col-sm-12">
            <p>Are you veteran</p>
          </div>
          <div class="col-sm-12">
            <v-radio-group v-model="q12">
              <v-radio
                v-for="(item, index) in yesNo"
                :key="index"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>

        <div class="row my-10">
          <div class="col-sm-12">
            <p>Which of the following describes you?</p>
          </div>
          <div class="col-sm-12">
            <v-radio-group v-model="q13">
              <v-radio
                v-for="(item, index) in ethnicities"
                :key="index"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </div>
        </div>

        <span class="btn btn-primary mb-10" @click="onSignup">Sign up</span>
      </v-form>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/api.js";
import axios from "axios";
export default {
  name: "Signup",

  watch: {
    q6() {
      if (this.q6 === "Yes") this.show7 = true;
      else this.show7 = false;
    },
  },

  data() {
    return {
      eventId: "",
      show7: true,
      q0: "",
      q1: "",
      q2: "",
      q3: "",
      q4: [],
      otherSocials: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      q10: "",
      q11: "",
      q12: "",
      q13: "",
      eventTypes: [],
      //   eventTypes: [{ type: "test 1" }, { type: "test 2" }, { type: "test 3" }],
      socials: [
        "Facebook",
        "Instagram",
        "Twitter",
        "Word of mouth",
        "KMAZ 102.5fm",
      ],
      ethnicities: [
        "Asian or Pacific Islander",
        "Black or African American",
        "Hispanic or Latino",
        "Native American or Alaskan Native",
        "White or Caucasian",
        "Multiracial or Biracial",
        "A race/ethnicity not listed here",
      ],
      vaccine: ["Moderna", "Pfiza"],
      yesNo: ["Yes", "No"],

      // Rules
      inputRule: [(value) => !!value || "field required"],
    };
  },

  mounted() {
    this.getTopThreeEvents();
  },

  methods: {
    getTopThreeEvents() {
      axios
        .get(`${BASE_URL}events/currentevents`)
        .then((res) => {
          res.data.forEach((ev) => {
            this.eventTypes.push(
              `${ev.type}, ${ev.date.split("T")[0]}, ${ev.location}`
            );
          });
        })
        .catch((err) => console.log(err));
    },

    async getEventID() {
      try {
          const res = await axios.post(`${BASE_URL}events/geteventbytype`, {
        type: this.q0.split(",")[0],
      });
      this.eventId = res.data.data;
      } catch(err) {
          console.log(err);
      }
    },

    async onSignup() {
      if (this.$refs.formSignup.validate()) {
        await this.getEventID();
        axios
          .post(`${BASE_URL}users/`, {
            eventID: this.eventId,
            firstName: this.q1,
            lastName: this.q2,
            phoneNumber: this.q3,
            hearAbout: this.q4,
            zipCode: this.q5,
            covidVaccine: this.q6,
            vaccinePreference: this.q7,
            receivedVaccine: this.q8,
            additionalServices: this.q9,
            chidrenInHousehold: this.q10,
            olderPeople: this.q11,
            veteran: this.q12,
            ethnicity: this.q13,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        alert("please fill out all the information");
      }
    },
  },
};
</script>

<style scoped></style>
