<template>
    <div>
        <line-chart v-if="componentState" :chart-data="chartData" :height="200" :options="options"></line-chart>

        <div style="display: flex">
            <button @click="legendLeft"><</button>
            <button @click="leftMinusLegend">-</button>
            <button @click="leftPlusLegend">+</button>
            <input v-model="legend.range.left" type="text">
            <input :value="legend.range.right - legend.range.left" type="text">
            <input v-model="legend.range.right" type="text">
            <button @click="rightMinusLegend">-</button>
            <button @click="rightPlusLegend">+</button>
            <button @click="legendRight">></button>
        </div>
    </div>
</template>

<script>
    import LineChart from './LineChart';
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "LineChartComponent",
        components: {
            LineChart
        },
        data() {
            return {
                componentState: true
            }
        },
        computed: {
            ...mapGetters(['testData', 'data', 'chartData', 'options', 'legend'])
        },
        methods: {
            ...mapActions(['leftMinusLegend', 'leftPlusLegend', 'rightMinusLegend', 'rightPlusLegend', 'legendRight', 'legendLeft']),
            ...mapMutations(['setData', 'setColor']),
            changeColor() {
                this.setColor();
            }
        },
        created() {
            this.setData();
            console.log(this.data);
        }
    }
</script>

<style scoped>

</style>