<template>
  <div class="applicant" :class="{ complete: applicant.complete }">
    <div class="actions">
      <h3 @click="dialog = !dialog">
        {{ applicant.fName }}.{{ applicant.sName.charAt(0) }}
        <p class="title">&nbsp; {{ applicant.title }}</p>
      </h3>

      <v-btn @click="dialog = !dialog">Tarkastele profiilia</v-btn>
    </div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ applicant.fName }} {{ applicant.sName }} -{{ applicant.title }}
          </v-card-title>
          <v-card-text>{{ applicant.details }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Sulje
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["applicant"],
  data() {
    return {
      dialog: false,
      uri: "http://localhost:3000/projects/" + this.applicant.id,
    };
  },
  methods: {
    deleteProject() {
      fetch(this.uri, { method: "DELETE" })
        .then(() => this.$emit("delete", this.applicant.id))
        .catch((err) => console.log(err));
    },
    toggleComplete() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: !this.applicant.complete }),
      })
        .then(() => {
          this.$emit("complete", this.applicant.id);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.applicant {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  border-left: 4px solid #409dde;
}
h3 {
  cursor: pointer;
}
.title {
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
.v-dialog {
  margin: auto;
  width: 600px;
}
.content {
  width: 500px;
}
</style>