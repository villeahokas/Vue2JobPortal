<template>
  <nav class="filter-nav">
    <button 
      @click="updateFilter('byTitle')" 
      :class="{ active: current === 'byTitle'}"
    >nimikkeen mukaan</button>
    <button 
      @click="updateFilter('byEmployer')"
      :class="{ active: current === 'byEmployer'}"
    >työnantajan mukaan</button>
  </nav>
</template>

<script>
export default {
  props: ['current'],
  methods: {
    updateFilter(by) {
      this.$emit('filterChange', by)
    }
  }
}
</script>

<style>
  .filter-nav {
    text-align: center;
  }
  .filter-nav button {
    background: none;
    border: none;
    color: #bbb;
    outline: none;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
  }
  .filter-nav button.active {
    color: #555;
  }
</style>