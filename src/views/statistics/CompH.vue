<template>
<section>
  <el-row style="text-align: left;padding-bottom: 10px;border-bottom: 1px solid #c5ccd5;">
    <el-button type="success" plain>逐时</el-button>
    <el-button type="success" plain>逐日</el-button>
    <el-button type="success" plain>逐月</el-button>
  </el-row>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;text-align: left;margin-top: 10px;"> 
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-select v-model="filters.collectorID" placeholder="" @focus="geCollector()" >
          <el-option v-for="item in collectors"
               :key="item.collectorid"
               :label="item.name"
               :value="item.collectorid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="block">
          <span class="demonstration">年份</span>
          <el-date-picker
            v-model="year"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
        <div class="block" v-if="this.filters.timeTypeValue == 0">
            <span class="demonstration">月</span>
            <el-date-picker
              v-model="filters.month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">刷新</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  
  
   <template>
    <div id="myChart" style="width:100%;height:650px;text-align: center;margin-top: 60px;"></div>
  </template>
  

</section>
</template>

<script>

// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

let data = () => {
  return {
    //查询条件
    filters: {
      collectorID: ''
    },
    year : new Date().getFullYear()+'',
    collectors : []

  }
}

let geCollector = function() {
  this.$axios({
            method: 'get',
            url:"/getCollector",
            data:null,
        }).then((res)=>{
            this.collectors = res.data.data;
        });
}

export default {
  data: data,
  methods: {
    //获取所有集中器列表
    geCollector,
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title : {
          text: '上海永继电气股份有限公司',
          
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['客厅','空调']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'客厅',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                },
                itemStyle:{
                    normal:{
                        color:'#63B8FF'
                    }
                },
            },
            {
                name:'空调',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint : {
                    data : [
                        {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                        {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                },
                itemStyle:{
                    normal:{
                        color:'#4876FF'
                    }
                },
            }
        ]
      });
    }
  },
  mounted: function() {
   this.drawLine();
  }
}
</script>

<style>
 
</style>
