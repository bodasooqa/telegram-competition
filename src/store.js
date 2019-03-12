import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

import data from './assets/chart_data'
import testData from './assets/test_data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: data,

    options: {
      responsive: true,
      maintainAspectRation: true,
      legend: false
    },

    formattedData: {
      labels: null,
      y0: null,
      y1: null
    },

    chartData: {
      labels: null,
      datasets: [
        {
          data: null,
          lineTension: 0,
          fill: false,
          pointRadius: 0
        },
        {
          data: null,
          lineTension: 0,
          fill: false,
          pointRadius: 0
        },
      ]
    },

    legend: {
      range: {
        left: 50,
        right: 60
      }
    },

    testData: testData
  },
  getters: {
    data(state) {
      return state.data;
    },
    options(state) {
      return state.options;
    },
    testData(state) {
      return state.testData;
    },
    formattedData(state) {
      return state.formattedData;
    },
    chartData(state) {
      return state.chartData;
    },
    legend(state) {
      return state.legend;
    }
  },
  mutations: {
    setData(state) {
      state.formattedData.labels = data[0].columns[0].filter(item => {
        if (item !== 'x') {
          return item;
        }
      });

      state.formattedData.labels = state.formattedData.labels.map(item => {
        return moment(item).format('MMM D');
      });

      state.chartData.labels = state.formattedData.labels.slice(state.legend.range.left, state.legend.range.right);

      state.formattedData.y0 = data[0].columns[1].filter(item => {
        if (item !== 'y0') {
          return item;
        }
      });

      state.formattedData.y1 = data[0].columns[2].filter(item => {
        if (item !== 'y1') {
          return item;
        }
      });

      state.chartData.datasets[0].data = state.formattedData.y0.slice(state.legend.range.left, state.legend.range.right);
      state.chartData.datasets[1].data = state.formattedData.y1.slice(state.legend.range.left, state.legend.range.right);

      state.chartData.datasets[0].borderColor = data[0].colors['y0'];
      state.chartData.datasets[1].borderColor = data[0].colors['y1'];
      state.chartData.datasets[0].label = data[0].names['y0'];
      state.chartData.datasets[1].label = data[0].names['y1'];
    },
    updateChartData(state) {
      state.chartData.labels = state.formattedData.labels.slice(state.legend.range.left, state.legend.range.right);
      state.chartData.datasets[0].data = state.formattedData.y0.slice(state.legend.range.left, state.legend.range.right);
      state.chartData.datasets[1].data = state.formattedData.y1.slice(state.legend.range.left, state.legend.range.right);
    },
    rightPlusLegend(state) {
      if (state.legend.range.right < state.formattedData.labels.length) state.legend.range.right++;
    },
    rightMinusLegend(state) {
      if (state.legend.range.right > (state.legend.range.left + 2)) state.legend.range.right--;
    },
    leftPlusLegend(state) {
      if (state.legend.range.left < (state.legend.range.right - 2)) state.legend.range.left++;
    },
    leftMinusLegend(state) {
      if (state.legend.range.left > 0) state.legend.range.left--;
    },
    legendRight(state) {
      if (state.legend.range.right < state.formattedData.labels.length) {
        state.legend.range.left++;
        state.legend.range.right++;
      }
    },
    legendLeft(state) {
      if (state.legend.range.left > 0) {
        state.legend.range.left--;
        state.legend.range.right--;
      }
    }
  },
  actions: {
    rightPlusLegend(context) {
      context.commit('rightPlusLegend');
      context.commit('updateChartData');
    },
    rightMinusLegend(context) {
      context.commit('rightMinusLegend');
      context.commit('updateChartData');
    },
    leftPlusLegend(context) {
      context.commit('leftPlusLegend');
      context.commit('updateChartData');
    },
    leftMinusLegend(context) {
      context.commit('leftMinusLegend');
      context.commit('updateChartData');
    },
    legendRight(context) {
      context.commit('legendRight');
      context.commit('updateChartData');
    },
    legendLeft(context) {
      context.commit('legendLeft');
      context.commit('updateChartData');
    }
  }
})
