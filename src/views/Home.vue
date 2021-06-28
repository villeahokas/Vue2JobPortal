<template>
  <div class="home">
    
    <h1 class="header">Työpaikat</h1>

    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Etsi työpaikkaa.." />
    </div>

    <FilterNav :current="current" @filterChange="current = $event" />
    <v-virtual-scroll :items="filtered" :item-height="100" height="700">
      <template v-slot:default="{ item }">
        <v-list-item>
          <v-list-item-content>
            <SinglePosition :position="item" @delete="handleDelete" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-virtual-scroll>

    <h1 class="header">Työnhakijat</h1>

    <div v-if="Allapplicants.length">
      <div v-for="applicant in Allapplicants" :key="applicant.id">
        <SingleApplicant :applicant="applicant" />
      </div>
    </div>
  </div>
</template>

<script>
import SinglePosition from "../components/SinglePosition.vue";
import SingleApplicant from "../components/SingleApplicant.vue";
import FilterNav from "../components/FilterNav.vue";

export default {
  name: "Home",
  components: { SinglePosition, SingleApplicant, FilterNav },
  data() {
    return {
      openPositions: [],
      Allapplicants: [],
      current: "byTitle",
      search: "",
      dialog: true,
      dialogm1: "",
    };
  },
  mounted() {
    fetch("http://localhost:3000/openPositions")
      .then((res) => res.json())
      .then((data) => (this.openPositions = data))
      .catch((err) => console.log(err)),
      fetch("http://localhost:3000/applicants")
        .then((res) => res.json())
        .then((data) => (this.Allapplicants = data))
        .catch((err) => console.log(err));
  },
  methods: {
    handleDelete(id) {
      this.openPositions = this.openPositions.filter((project) => {
        return project.id !== id;
      });
    },
  },
  computed: {
    filtered() {
      return this.openPositions.filter((position) => {
        if (this.current === "byTitle")
          return position.title
            .toLowerCase()
            .includes(this.search.toLowerCase());
        else
          return position.company
            .toLowerCase()
            .includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.header {
  margin-left: 10px;
}
</style>