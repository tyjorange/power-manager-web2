<template>
  <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="今年" name="t1">
      <!-- <div id="myChart1" :style="{height:height,width:width}" /> -->
    </el-tab-pane>
    <el-tab-pane label="当月" name="t2">
      <!-- <div id="myChart2" :style="{height:height,width:width}" /> -->
    </el-tab-pane>
    <el-tab-pane label="昨日" name="t3">
      <!-- <div id="myChart3" :style="{height:height,width:width}" /> -->
    </el-tab-pane>
    <div id="pieChart1" :style="{height:height,width:width}" />
  </el-tabs>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
const demoChartData = {
  t1: [
    { value: 320, name: "动力" },
    { value: 240, name: "照明" },
    { value: 149, name: "空调" },
    { value: 100, name: "空压" },
    { value: 259, name: "电梯" },
    { value: 100, name: "生活" },
    { value: 190, name: "特殊" }
  ],
  t2: [
    { value: 120, name: "动力" },
    { value: 140, name: "照明" },
    { value: 149, name: "空调" },
    { value: 100, name: "空压" },
    { value: 159, name: "电梯" },
    { value: 100, name: "生活" },
    { value: 190, name: "特殊" }
  ],
  t3: [
    { value: 220, name: "动力" },
    { value: 240, name: "照明" },
    { value: 249, name: "空调" },
    { value: 100, name: "空压" },
    { value: 259, name: "电梯" },
    { value: 100, name: "生活" },
    { value: 190, name: "特殊" }
  ]
};
export default {
  props: {
    className: {
      type: String,
      default: "myChart"
    },
    width: {
      type: String,
      default: "532px"
    },
    height: {
      type: String,
      default: "300px"
    }
    // chartData: {
    //   type: Object,
    //   default: () => demoChartData,
    //   required: true
    // }
  },
  data() {
    return {
      chart: null,
      activeName: "t3",
      chartData: demoChartData.t3
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setData(val);
      }
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById("pieChart1"), "macarons");
    this.setData(this.chartData);
    //this.initChart1();
    //this.initChart2();
    //this.initChart3();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    setData(actualData) {
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["动力", "照明", "空调", "空压", "电梯", "生活", "特殊"]
        },
        calculable: true,
        series: [
          {
            name: "WEEKLY WRITE ARTICLES",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: actualData,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c} ({d}%)"
                },
                labelLine: { show: true }
              }
            },
            animationEasing: "cubicInOut",
            animationDuration: 1500
          }
        ]
      });
    },
    handleClick(tab, event) {
      this.chartData = demoChartData[tab.paneName];
    }
  }
};
</script>
