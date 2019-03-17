import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

import data from './assets/chart_data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: data,
    options: {
      responsive: true,
      maintainAspectRation: true,
      legend: false,
      animation: false
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
          pointRadius: 0,
          hidden: false
        },
        {
          data: null,
          lineTension: 0,
          fill: false,
          pointRadius: 0,
          hidden: false
        },
      ]
    },
    legend: {
      range: {
        left: 50,
        right: 60,
        all: null
      }
    }
  },
  getters: {
    data(state) {
      return state.data;
    },
    options(state) {
      return state.options;
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
      state.legend.range.all = [state.legend.range.left, state.legend.range.right];

      state.formattedData.labels = data[0].columns[0].filter(item => {
        if (item !== 'x') {
          return item;
        }
      });

      state.formattedData.labels = state.formattedData.labels.map(item => {
        return moment(item).format('MMM D');
      });

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

      // Chart Data settings
      state.chartData.labels = state.formattedData.labels.slice(state.legend.range.left, state.legend.range.right);

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
    changeAll(context, payload) {
      let left = context.state.legend.range.left;
      let right = context.state.legend.range.right;
      context.state.legend.range.left = payload[0];
      context.state.legend.range.right = payload[1];

      if (context.state.legend.range.left < left && context.state.legend.range.right < right) {
        context.commit('legendLeft');
      } else if (context.state.legend.range.left < left && context.state.legend.range.right === right) {
        context.commit('leftMinusLegend');
      } else if (context.state.legend.range.left > left && context.state.legend.range.right === right) {
        context.commit('leftPlusLegend');
      } else if (context.state.legend.range.left === left && context.state.legend.range.right > right) {
        context.commit('rightPlusLegend');
      } else if (context.state.legend.range.left === left && context.state.legend.range.right < right) {
        context.commit('rightMinusLegend');
      } else if (context.state.legend.range.left > left && context.state.legend.range.right > right) {
        context.commit('legendRight');
      }

      context.commit('updateChartData');
    }
  }
})
