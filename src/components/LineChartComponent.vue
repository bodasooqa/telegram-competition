<template>
    <div>

        <line-chart class="chart" v-if="componentState" :chart-data="chartData" :height="100" :options="options"></line-chart>

        <div style="display: flex">
            <button @click="doEvent('legendLeft')"><</button>
            <button @click="doEvent('leftMinusLegend')">-</button>
            <button @click="doEvent('leftPlusLegend')">+</button>
            <input v-model="legend.range.left" type="text">
            <input :value="legend.range.right - legend.range.left" type="text">
            <input v-model="legend.range.right" type="text">
            <button @click="doEvent('rightMinusLegend')">-</button>
            <button @click="doEvent('rightPlusLegend')">+</button>
            <button @click="doEvent('legendRight')">></button>
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
                componentState: true,
            }
        },
        computed: {
            ...mapGetters(['testData', 'data', 'chartData', 'options', 'legend'])
        },
        methods: {
            ...mapActions(['leftMinusLegend', 'leftPlusLegend', 'rightMinusLegend', 'rightPlusLegend', 'legendRight', 'legendLeft']),
            ...mapMutations(['setData', 'setColor']),
            doEvent(eventName) {
                this[eventName]();
                this.componentState = false;
                this.$nextTick().then(() => {
                    this.componentState = true;
                });
            }
        },
        created() {
            this.setData();
            console.log(this.data);
        }
    }
</script>

<style scoped>
    .chart {
        border: 1px solid #e4e4e4;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 2rem;
        transition: all 0.3s;
    }
</style>