<template>
  <div>
    <div class="position">
      <div class="actions">
        <h3 @click="toggleDialog">
          {{ position.title }}
          <p class="company">{{ position.company }}</p>
        </h3>
        <div class="icons">
          <v-icon @click="deleteProject" class="material-icons"
            >mdi-delete</v-icon
          >
          <v-icon @click="addApplicant" class="material-icons"
            >mdi-account-plus</v-icon
          >
        </div>
      </div>
    </div>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ position.title }} -{{ position.company }}
          </v-card-title>
          <v-card-text>{{ position.details }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Sulje
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog2" persistent max-width="600">
        <v-card>
          <v-container>
            <v-card-title class="text-h5 grey lighten-2">
              {{ position.title }} -{{ position.company }}
            </v-card-title>

            <v-card-text>Tehtävään hakeneet:</v-card-text>
            <div row v-if="Applied.length">
              <div v-for="applicant in Applied" :key="applicant.id">
                <v-card-text
                  >{{ applicant.fName }} {{ applicant.sName }}</v-card-text
                >
              </div>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-layout row v-if="Allapplicants.length">
                <div v-for="applicant in Allapplicants" :key="applicant.id">
                  <v-btn width="400" @click="add(applicant)"
                    >Lisää {{ applicant.fName }}
                    {{ applicant.sName }} hakijoiden listaan</v-btn
                  >
                  <v-spacer></v-spacer>
                </div>
              </v-layout>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click.stop="dialog2 = false"
                >Sulje</v-btn
              >
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["position", "visible"],

  data() {
    return {
      Allapplicants: [],
      Applied: [],
      dialog1: false,
      dialog2: false,
      dialog: false,
      uri: "http://localhost:3000/openPositions/" + this.position.id,
    };
  },
  mounted() {
    fetch("http://localhost:3000/applicants")
      .then((res) => res.json())
      .then((data) => (this.Allapplicants = data))
      .catch((err) => console.log(err));
  },
  methods: {
    deleteProject() {
      fetch(this.uri, { method: "DELETE" })
        .then(() => this.$emit("delete", this.position.id))
        .catch((err) => console.log(err));
    },
    addApplicant() {
      this.dialog2 = !this.dialog2;
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    add(a) {
      this.Applied.push(a);
    },
  },
};
</script>

<style scoped>
.position {
  margin: 25px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  max-width: 600px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #409dde;
}
h3 {
  cursor: pointer;
}
.company {
  font-size: 14px;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-icons:hover {
  color: #777;
}
.v-icon {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.v-icon:hover {
  color: #777;
}
</style>