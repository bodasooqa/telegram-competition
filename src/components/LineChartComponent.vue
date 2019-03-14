<template>
    <div>
        <line-chart class="chart" v-if="componentState" :chart-data="chartData" :height="600" :options="options"></line-chart>

        <vue-slider @change="doChangeAll(legend.range.all)" :min-range="10" :max="formattedData.labels.length"
                    tooltip="none" v-model="legend.range.all"></vue-slider>
    </div>
</template>

<script>
    import LineChart from './LineChart';
    import {mapActions, mapGetters, mapMutations} from "vuex";

    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'

    export default {
        name: "LineChartComponent",
        components: {
            LineChart, VueSlider
        },
        data() {
            return {
                componentState: true,
            }
        },
        computed: {
            ...mapGetters(['data', 'chartData', 'options', 'legend', 'formattedData'])
        },
        methods: {
            ...mapActions(['changeAll']),
            ...mapMutations(['setData']),
            doChangeAll(all) {
                this.changeAll(all);
                this.componentState = false;
                this.$nextTick().then(() => {
                    this.componentState = true;
                });
            }
        },
        created() {
            this.setData();
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
    .vue-slider {
        padding: 7px 8px !important;
    }
</style>