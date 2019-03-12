<template>
  <div id="app">
    <line-chart-component></line-chart-component>
  </div>
</template>

<script>
import LineChartComponent from "./components/LineChartComponent";

export default {
  name: 'app',
  components: {
    LineChartComponent
  },
  mounted() {
    console.log(this.data);
  }
}
</script>

<style lang="scss">

</style>
