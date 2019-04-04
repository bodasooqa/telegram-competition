<template>
    <div>
        <line-chart class="chart" v-if="componentState" :chart-data="chartData" :height="chartHeight" :options="options"></line-chart>

        <vue-slider @change="doChangeAll(legend.range.all)" :min-range="10" :max="formattedData0.labels.length"
                    tooltip="none" v-model="legend.range.all"></vue-slider>

        <div class="d-flex">
            <div class="select first">
                <label class="slider">
                    <input @change="updateComp" id="first" type="checkbox" v-model="chartData.datasets[0].hidden">
                    <span class="circle"></span>
                    <span class="name">{{chartData.datasets[0].label}}</span>
                </label>
            </div>
            <div class="select second">
                <label class="slider">
                    <input @change="updateComp" id="second" type="checkbox" v-model="chartData.datasets[1].hidden">
                    <span class="circle"></span>
                    <span class="name">{{chartData.datasets[1].label}}</span>
                </label>
            </div>
        </div>

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
        props: ['id'],
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
            ...mapGetters([
                'data', 'options',
                `chartData0`, `legend0`, `formattedData0`,
                `chartData1`, `legend1`, `formattedData1`,
                `chartData2`, `legend2`, `formattedData2`,
                `chartData3`, `legend3`, `formattedData3`,
            ]),
            chartHeight() {
                let height = 0;
                if (this.window.width < 415) {
                    height = 400;
                } else {
                    height = 100;
                }
                return height;
            },
            chartData() {
                return this[`chartData${this.id}`];
            },
            formattedData() {
                return this[`formattedData${this.id}`];
            },
            legend() {
                return this[`legend${this.id}`];
            }
        },
        methods: {
            ...mapActions(['changeAll']),
            ...mapMutations(['setData']),
            doChangeAll(all) {
                this.changeAll({all: all, id: this.id});
                this.updateComp();
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
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
            this.setData(this.id);
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        }
    }
</script>

<style lang="scss" scoped>
    .chart {
        border: 1px solid #e4e4e4;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 2rem;
        transition: all 0.3s;
    }
    .d-flex {
        display: flex;
    }
    .vue-slider {
        padding: 7px 8px !important;
    }
</style>