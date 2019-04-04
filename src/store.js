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
    formattedData0: {
      labels: null,
      y0: null,
      y1: null
    },
    formattedData1: {
      labels: null,
      y0: null,
      y1: null
    },
    formattedData2: {
      labels: null,
      y0: null,
      y1: null
    },
    formattedData3: {
      labels: null,
      y0: null,
      y1: null
    },
    chartData0: {
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
    chartData1: {
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
    chartData2: {
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
    chartData3: {
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
    legend0: {
      range: {
        left: 50,
        right: 60,
        all: null
      }
    },
    legend1: {
      range: {
        left: 50,
        right: 60,
        all: null
      }
    },
    legend2: {
      range: {
        left: 50,
        right: 60,
        all: null
      }
    },
    legend3: {
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
    formattedData0(state) {
      return state.formattedData0;
    },
    formattedData1(state) {
      return state.formattedData1;
    },
    formattedData2(state) {
      return state.formattedData2;
    },
    formattedData3(state) {
      return state.formattedData3;
    },
    chartData0(state) {
      return state.chartData0;
    },
    chartData1(state) {
      return state.chartData1;
    },
    chartData2(state) {
      return state.chartData2;
    },
    chartData3(state) {
      return state.chartData3;
    },
    legend0(state) {
      return state.legend0;
    },
    legend1(state) {
      return state.legend1;
    },
    legend2(state) {
      return state.legend2;
    },
    legend3(state) {
      return state.legend3;
    }
  },
  mutations: {
    setData(state, id) {
      state[`legend${id}`].range.all = [state[`legend${id}`].range.left, state[`legend${id}`].range.right];

      state[`formattedData${id}`].labels = data[id].columns[0].filter(item => {
        if (item !== 'x') {
          return item;
        }
      });

      state[`formattedData${id}`].labels = state[`formattedData${id}`].labels.map(item => {
        return moment(item).format('MMM D');
      });

      state[`formattedData${id}`].y0 = data[id].columns[1].filter(item => {
        if (item !== 'y0') {
          return item;
        }
      });

      state[`formattedData${id}`].y1 = data[id].columns[2].filter(item => {
        if (item !== 'y1') {
          return item;
        }
      });

      // Chart Data settings
      state[`chartData${id}`].labels = state[`formattedData${id}`].labels.slice(state[`legend${id}`].range.left, state[`legend${id}`].range.right);

      state[`chartData${id}`].datasets[0].data = state[`formattedData${id}`].y0.slice(state[`legend${id}`].range.left, state[`legend${id}`].range.right);
      state[`chartData${id}`].datasets[1].data = state[`formattedData${id}`].y1.slice(state[`legend${id}`].range.left, state[`legend${id}`].range.right);

      state[`chartData${id}`].datasets[0].borderColor = data[id].colors['y0'];
      state[`chartData${id}`].datasets[1].borderColor = data[id].colors['y1'];
      state[`chartData${id}`].datasets[0].label = data[id].names['y0'];
      state[`chartData${id}`].datasets[1].label = data[id].names['y1'];
    },
    updateChartData(state, id) {
      state[`chartData${id}`].labels = state[`formattedData${id}`].labels.slice(state[`legend${id}`].range.left, state[`legend${id}`].range.right);
      state[`chartData${id}`].datasets[0].data = state[`formattedData${id}`].y0.slice(state[`legend${id}`].range.left, state[`legend${id}`].range.right);
      state[`chartData${id}`].datasets[1].data = state[`formattedData${id}`].y1.slice(state[`legend${id}`].range.left, state[`legend${id}`].range.right);
    },
    rightPlusLegend(state, id) {
      if (state[`legend${id}`].range.right < state[`formattedData${id}`].labels.length) state[`legend${id}`].range.right++;
    },
    rightMinusLegend(state, id) {
      if (state[`legend${id}`].range.right > (state[`legend${id}`].range.left + 2)) state[`legend${id}`].range.right--;
    },
    leftPlusLegend(state, id) {
      if (state[`legend${id}`].range.left < (state[`legend${id}`].range.right - 2)) state[`legend${id}`].range.left++;
    },
    leftMinusLegend(state, id) {
      if (state[`legend${id}`].range.left > 0) state[`legend${id}`].range.left--;
    },
    legendRight(state, id) {
      if (state[`legend${id}`].range.right < state[`formattedData${id}`].labels.length) {
        state[`legend${id}`].range.left++;
        state[`legend${id}`].range.right++;
      }
    },
    legendLeft(state, id) {
      if (state[`legend${id}`].range.left > 0) {
        state[`legend${id}`].range.left--;
        state[`legend${id}`].range.right--;
      }
    }
  },
  actions: {
    changeAll(context, payload) {
      let left = context.state[`legend${payload.id}`].range.left;
      let right = context.state[`legend${payload.id}`].range.right;
      context.state[`legend${payload.id}`].range.left = payload.all[0];
      context.state[`legend${payload.id}`].range.right = payload.all[1];

      if (context.state[`legend${payload.id}`].range.left < left && context.state[`legend${payload.id}`].range.right < right) {
        context.commit('legendLeft', payload.id);
      } else if (context.state[`legend${payload.id}`].range.left < left && context.state[`legend${payload.id}`].range.right === right) {
        context.commit('leftMinusLegend', payload.id);
      } else if (context.state[`legend${payload.id}`].range.left > left && context.state[`legend${payload.id}`].range.right === right) {
        context.commit('leftPlusLegend', payload.id);
      } else if (context.state[`legend${payload.id}`].range.left === left && context.state[`legend${payload.id}`].range.right > right) {
        context.commit('rightPlusLegend', payload.id);
      } else if (context.state[`legend${payload.id}`].range.left === left && context.state[`legend${payload.id}`].range.right < right) {
        context.commit('rightMinusLegend', payload.id);
      } else if (context.state[`legend${payload.id}`].range.left > left && context.state[`legend${payload.id}`].range.right > right) {
        context.commit('legendRight', payload.id);
      }

      context.commit('updateChartData', payload.id);
    }
  }
})
