<template>
<section style="padding: 10px;">
  <el-row style="text-align: left;padding-bottom: 10px;border-bottom: 1px solid #c5ccd5;">
    <el-button type="success" plain>逐时</el-button>
    <el-button type="success" plain>逐日</el-button>
    <el-button type="success" plain>逐月</el-button>
    <el-button type="success" plain>逐年</el-button>

    
    <div class="block" style="float: right;">
        
        <el-date-picker v-model="year" type="year" placeholder="选择年">
        </el-date-picker>
    </div>
    <label style="float: right;line-height: 40px;margin-right: 5px;">年份</label>
    
  </el-row>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;text-align: left;margin-top: 10px;"> 
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <template>
            <el-form>
                <el-form-item>
                <select-tree v-model="statisticalObjects" :options="options" :props="defaultProps"  />
                </el-form-item>
            </el-form>
        </template>
      </el-form-item>
     
      <template>
        <el-form-item label="能源种类">
            <el-select v-model="energyType" placeholder="请选择">
                <el-option
                v-for="item in energyTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
      </template>
      
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

import SelectTree from '@/components/SelectTree/index.vue';

let data = () => {
  return {
    // 默认选中值
      statisticalObjects: 'root',
      // 数据默认字段
      defaultProps: {
        parent: 'parentId',   // 父级唯一标识
        value: 'id',          // 唯一标识
        label: 'label',       // 标签显示
        children: 'children', // 子级
      },
      // 数据列表
      options: [
        {
          parentId: '0',
          id: 'root',
          label: '上海永继电气股份有限公司',
          children: [
            {
              parentId: 'root',
              id: '1',
              label: '智能研发部办公室',
            },
            {
              parentId: 'root',
              id: '2',
              label: '索罗思腾内网测试',
            },
          ],
        }
      ],
    energyTypeOptions: [
        {
          value: '0',
          label: '全部'
        }, 
        {
          value: '1',
          label: '电力'
        }, {
          value: '2',
          label: '水'
        }, {
          value: '3',
          label: '热能'
        }, {
          value: '4',
          label: '燃气'
        }],
    energyType: '0',
    filters:{

    },
    year : new Date().getFullYear()+'',
  }
}


export default {
  components: {
    SelectTree,
  },
  data: data,
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title : {
          text: '',
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['上海永继电气股份有限公司']
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
                name:'上海永继电气股份有限公司',
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
 .el-table th{
     text-align: center;
 }
</style>
