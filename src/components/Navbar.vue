<template>
  <v-bottom-navigation 
    :value="value"
    grow
    color="primary"
    >
    <v-btn @click="goHome()" value="home">
      <v-icon>mdi-home</v-icon>
      <span>Etusivu</span>
    </v-btn>

    <v-btn @click="goAddPos()" value="addPosition">
      <v-icon>mdi-briefcase-plus</v-icon>
      <span>Lisää työpaikka</span>
    </v-btn>

    <v-btn @click="goAddApplicant()" value="addApplicant">
      <v-icon>mdi-account-plus</v-icon>
      <span>Lisää työnhakija</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script> 
export default {
    data: () => ({ value: 1 }),
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goAddPos() {
      this.$router.push("/addPosition");
    },
    goAddApplicant() {
      this.$router.push("/addApplicant");
    },
  },
};
</script>

<style>
</style>