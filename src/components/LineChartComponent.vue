<template>
    <div>
        <line-chart class="chart" v-if="componentState" :chart-data="sortedData" :height="chartHeight" :options="options"></line-chart>

        <vue-slider @change="doChangeAll(legend.range.all)" :min-range="10" :max="formattedData.labels.length"
                    tooltip="none" v-model="legend.range.all"></vue-slider>

        <input @change="changeSortedData" type="checkbox" v-model="firstChart">
        <input @change="changeSortedData" type="checkbox" v-model="secondChart">
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
                window: {
                    width: 1000,
                    height: null
                },
                firstChart: true,
                secondChart: true,
            }
        },
        computed: {
            ...mapGetters(['data', 'chartData', 'options', 'legend', 'formattedData']),
            chartHeight() {
                let height = 0;
                if (this.window.width < 415) {
                    height = 400;
                } else {
                    height = 100;
                }
                return height;
            },
            sortedData() {
                let data = this.chartData;
                if (this.firstChart && this.secondChart) {
                    data = this.chartData;
                } else if (this.firstChart && !this.secondChart) {
                    data = this.chartData;
                    data.datasets = this.chartData.datasets.slice(1,2);
                } else if (!this.firstChart && this.secondChart) {
                    data = this.chartData;
                    data.datasets = this.chartData.datasets.slice(0,1);
                }
                return data;
            }
        },
        methods: {
            ...mapActions(['changeAll']),
            ...mapMutations(['setData']),
            doChangeAll(all) {
                this.changeAll(all);
                this.updateComp();
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
            changeSortedData() {
                this.updateComp();
            },
            updateComp() {
                this.componentState = false;
                this.$nextTick().then(() => {
                    this.componentState = true;
                });
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
            this.setData();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
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