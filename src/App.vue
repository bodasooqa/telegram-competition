<template>
  <div id="app" :class="{ 'night': !bgMode }">
    <div class="header">
      <h2>Followers</h2>
      <div class="select">
        <label class="slider">
          <input v-model="bgMode" type="checkbox" id="check">
          <span class="circle"></span>
        </label>
      </div>
    </div>

    <line-chart-component class="chart-component" :id="0"></line-chart-component>
    <line-chart-component class="chart-component" :id="1"></line-chart-component>
    <line-chart-component class="chart-component" :id="2"></line-chart-component>
    <line-chart-component class="chart-component" :id="3"></line-chart-component>
    <line-chart-component class="chart-component" :id="4"></line-chart-component>

    <footer>
      Made by Bodasooqa for Telegram
    </footer>
  </div>
</template>

<script>
import LineChartComponent from "./components/LineChartComponent";

export default {
  name: 'app',
  components: {
    LineChartComponent
  },
  data() {
    return {
      bgMode: true
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:600');

  body {
    margin: auto;
    font-family: 'Open Sans', sans-serif;
  }

  #app {
    padding: 15px;
    transition: all 0.3s;

    h2 {
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
    }

    button {
      background: none;
    }
  }

  .chart-component {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e4e4e4;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  footer {
    text-align: center;
    padding: 0 0 1rem;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  .night {
    background-color: rgb(33, 37, 36);
    .chart {
      border: 1px solid #444444;
    }
    h2 {
      color: #ffffff;
    }
    .first label.slider, .second label.slider {
      background-color: #0e1010;
      border: 2px solid #0e1010;
      .name {
        color: #fff;
      }
    }
    footer {
      color: #ffffff;
    }
    .chart-component {
      border-bottom: 1px solid #444444;
    }
  }
  
  div.select {
    display: flex;
    &.first, &.second {
      width: 130px;
    }
  }

  #check, #first, #second, #third, #fourth {
    display: none;
  }
  input[type="checkbox"] {
    &#first:checked, &#second:checked, &#third:checked, &#fourth:checked {
      & + span.circle {
        left: 0;
      }
    }
  }
  input[type="checkbox"]:checked {
    & + span.circle {
      left: 16px;
      background-color: #FABC62;
      box-shadow: 0 0 40px 0 #FABC62;
    }
  }
  input[type="checkbox"]:checked {
    & + span.circle::before, & + span.circle::after {
      background-color: rgba(250, 188, 98, 0);
    }
  }
  label.slider {
    margin-top: 2rem;
    border: 2px solid #06121C;
    border-radius: 100px;
    width: 32px;
    height: 16px;
    position: relative;
    background-color: #06121C;
    box-sizing: content-box;
    z-index: 1;
    transition: border .3s, background-color .3s, box-shadow .3s;
    cursor: pointer;
  }
  .first label.slider, .second label.slider {
    background-color: #e6e6e6;
    border: 2px solid #e6e6e6;
    & span.circle {
      left: 16px;
      background-color: #ffffff;
      box-shadow: 0 0 40px 0 #ffffff;
      &::before, &::after {
        background: none;
      }
    }
  }
  .first {
    label.slider span.circle {
      border: 1px solid #3DC23F;
      width: 14px;
      height: 14px;
      box-shadow: 0 0 40px 0 #3DC23F;
    }
    &.last {
      label.slider span.circle {
        border: 1px solid #cb513a;
        box-shadow: 0 0 40px 0 #cb513a;
      }
    }
  }
  .second {
    label.slider span.circle {
      border: 1px solid #F34C44;
      width: 14px;
      height: 14px;
      box-shadow: 0 0 40px 0 #F34C44;
    }
    &.last {
      label.slider span.circle {
        border: 1px solid #73c03a;
        box-shadow: 0 0 40px 0 #73c03a;
      }
    }
  }
  .third {
    label.slider span.circle {
      border: 1px solid #65b9ac;
      width: 14px;
      height: 14px;
      box-shadow: 0 0 40px 0 #65b9ac;
    }
  }
  .fourth {
    label.slider span.circle {
      border: 1px solid #4682b4;
      width: 14px;
      height: 14px;
      box-shadow: 0 0 40px 0 #4682b4;
    }
  }
  label.slider {
    &.isChecked {
      border: 6px solid #167694;
      background-color: #167694;
    }
    &:hover {
      box-shadow: 0 0 6px rgba(239, 239, 239, 0.32);
    }
  }
  span.circle {
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: #FEFAF4;
    border-radius: 50%;
    top: 0;
    left: 0;
    transition: left .3s, background-color .7s, box-shadow .3s;
    box-shadow: 0 0 20px 0 #FEFAF4;
    &::before, &::after {
      content: '';
      background-color: #dcd8d3;
      position: absolute;
      border-radius: 50%;
      transition: background-color .7s;
    }
    &::before {
      height: 2px;
      width: 2px;
      bottom: 2.5px;
      right: 5px;
    }
    &::after {
      height: 3px;
      width: 3px;
      bottom: 5px;
      right: 2.5px;
    }
  }
  span.name {
    position: absolute;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    top: -3px;
    left: 2.8rem;
  }
</style>
