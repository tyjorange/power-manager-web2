<template>
<section style="padding: 10px;">
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
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
        <el-select v-model="filters.timeTypeValue" name="timeType">
           <el-option
            v-for="item in timeTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="block" v-if="this.filters.timeTypeValue == 0">
          <el-date-picker
            v-model="filters.startTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span style="vertical-align: top;">——</span>
          <el-date-picker
            v-model="filters.endTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="block" v-if="this.filters.timeTypeValue == 1">
          <el-date-picker
            v-model="filters.month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <div class="block" v-if="this.filters.timeTypeValue == 2">
          <el-date-picker
            v-model="filters.year"
            format="yyyy"
            value-format="yyyy"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  icon="el-icon-search">刷新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  icon="el-icon-download">导出</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <el-table :data="tableData" style="width: 100%; margin-top: 20px" stripe border
    highlight-current-row align="center" show-summary>
    <el-table-column label="用能单元" prop="collectorName" key="collectorName" width="200" style="height:50px" fixed>
    </el-table-column>
      <el-table-column width="800" label="电力(千瓦时)">
          <el-table-column
            label="动力"
            prop="power"
            key="power"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="照明"
            prop="lighting"
            key="lighting"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="空调"
            prop="airConditioner"
            key="airConditioner"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="空压"
            prop="airPressure"
            key="airPressure"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="电梯"
            prop="elevator"
            key="elevator"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="生活"
            prop="live"
            key="live"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="特殊"
            prop="special"
            key="special"
            width="120px" style="height:50px">
          </el-table-column>
      </el-table-column>
      <el-table-column label="综合能耗(吨标准煤)" prop="comprehensive" key="comprehensive">
      </el-table-column> 
  </el-table>
 

</section>
</template>

<script>

let data = () => {
  return {
    //查询条件
    filters: {
      collectorID: '',
      timeTypeValue: '0' ,
      startTime: new Date().getFullYear()+'-'+new Date().getMonth()+1+"-"+"01",
      endTime: new Date().getFullYear()+'-'+new Date().getMonth()+1+"-"+new Date().getDay(),
      month: new Date().getFullYear()+'-'+new Date().getMonth()+"-",
      year:new Date().getFullYear()-1+'-'
    },
    //列表高度
    clientHeight: '100%',
    collectors : [],
    timeTypeOptions: [{
          value: '0',
          label: '自定义',
        }, {
          value: '1',
          label: '月'
        }, {
          value: '2',
          label: '年'
        }],
     tableData: [{
            collectorName: '智能研发部办公室',
            collectorCode: '1',
            power: '120',
            lighting:'452',
            airConditioner:'125',
            airPressure:'145',
            elevator:'147',
            live:'785',
            special:'0',
            comprehensive:'1585'
          }, {
            collectorName: '索罗思腾内网测试',
            collectorCode: '2',
            power: '234',
            lighting:'342',
            airConditioner:'677',
            airPressure:'123',
            elevator:'345',
            live:'678',
            special:'0',
            comprehensive:'2456'
          }]

  }
}

// let getRows = function() {
//   if (this.pageLoading)
//     return
//   this.pageLoading = true

//   //调用post请求
//   const url ='/gradeSubentry';
//   var params = new URLSearchParams();
//   params.append('collectorID', this.filters.collectorID);       //你要传给后台的参数值 key/value
//   if (this.filters.timeTypeValue == 0) {  //自定义时间
//     params.append('startTime', this.filters.startTime);
//     params.append('endTime', this.filters.endTime);
//   } else if (this.filters.timeTypeValue == 1) { //按月
//     params.append('startTime', this.filters.month);
//   } else {  //按年
//     params.append('startTime', this.filters.year);
//   }
//   params.append('timeType', this.filters.timeTypeValue);
//   this.$axios({
//     method: 'post',
//     url:url,
//     data:params
//   }).then((res)=>{
//    this.pageLoading = false

//     if(res.data.code === 403) {
//       this.common.notywarn(
//         this.$notify,
//         res.data.code,
//         res.data.msg
//       );
//       this.$router.replace({ path: "/" });
//     }

//     if (!res.data || !res.data.data)
//       return
//     //总数赋值
//     this.total = res.data.data.total
//     this.page++;
//     //页面元素赋值
//     this.rows = res.data.data;
//   }).catch(e => this.pageLoading = false)
// }

let initHeight = function() {
  this.clientHeight = (document.documentElement.clientHeight - 258) + 'px'
}

// let geCollector = function() {
//   this.$axios({
//             method: 'get',
//             url:"/getCollector",
//             data:null,
//         }).then((res)=>{
//             this.collectors = res.data.data;
//         });
// }

let geCollector = function() {
   this.collectors = [{collectorid:'1',name:'智能研发部办公室'},{collectorid:'2',name:'索罗思腾内网测试'}];  
}

export default {
  data: data,
  methods: {
    //获取分页
    // getRows,
    //获取所有集中器列表
    geCollector,
    //初始化高度
    initHeight,
    //改变行样式
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        const values = data.map(item => {
         return Number(item.timeValue[column.property.split('.')[1]])
        });
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });
      return sums;
    }
  },
  mounted: function() {
    window.addEventListener('resize', this.initHeight)
    this.initHeight()
    // this.getRows()
  }
}
</script>

<style>
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table__fixed-footer-wrapper tbody td {
    border-top: 1px solid #ebeef5;
    background-color: #dff0d8;
    color: #606266;
  }
  .el-table__footer-wrapper tbody td {
      background-color: #dff0d8;
      color: #606266;
  }
  .el-table th{
     text-align: center;
 }
</style>
