<template>
<section style="padding: 10px;">
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-cascader expand-trigger="hover" :options="opt1" v-model="filters.collectorID" 
          :show-all-levels="false"
          placeholder="集中器" clearable>
        </el-cascader>
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
        <el-button type="primary" @click="onSubmit" icon="el-icon-search">刷新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  icon="el-icon-download">导出</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <el-table :data="tableData" style="width: 100%; margin-top: 20px" stripe border
    highlight-current-row align="center" show-summary :summary-method="getSummaries">
    <el-table-column type="index">
    </el-table-column>
    <el-table-column label="用能单元" prop="collectorName" key="collectorName" width="300" style="height:50px">
    </el-table-column>
      <el-table-column width="800" label="电力(千瓦时)">
          <el-table-column
            label="动力"
            prop="power"
            key="power"
            :formatter="toFixed"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="照明"
            prop="lighting"
            key="lighting"
            :formatter="toFixed"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="空调"
            prop="airConditioner"
            key="airConditioner"
            :formatter="toFixed"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="空压"
            prop="airPressure"
            key="airPressure"
            :formatter="toFixed"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="电梯"
            prop="elevator"
            key="elevator"
            :formatter="toFixed"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="生活"
            prop="live"
            key="live"
            :formatter="toFixed"
            width="120px" style="height:50px">
          </el-table-column>
          <el-table-column
            label="特殊"
            prop="special"
            key="special"
            :formatter="toFixed"
            width="120px" style="height:50px">
          </el-table-column>
      </el-table-column>
      <el-table-column label="综合能耗(吨标准煤)" prop="comprehensive"  :formatter="toFixed" key="comprehensive">
      </el-table-column> 
  </el-table>
 

</section>
</template>

<script>

import { API_GetCollectors } from "@/api/monitor/realdata";
import { API_GradeSubentry } from "@/api/statistics/gradeSubentry";
import { getNowFormatDate } from "@/utils/index";

let data = () => {
  return {
    //查询条件
    filters: {
      collectorID:["1"],
      timeTypeValue: '0' ,
      startTime: new Date().getFullYear()-1+'-01-01',
      endTime: getNowFormatDate(),
      month: new Date().getFullYear()+'-'+new Date().getMonth()+1+"",
      year:new Date().getFullYear()-1+''
    },
    //列表高度
    clientHeight: '100%',
    opt1: [],
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
     tableData: [],
     collectorID:'',
     startTime:'',
     endTime:''
  }
}


export default {
  data: data,
  methods: {
    onSubmit() {
      if (Array.isArray(this.filters.collectorID) && this.filters.collectorID.length > 1) {
        this.collectorID = this.filters.collectorID[this.filters.collectorID.length-1];
      }
      if (this.filters.timeTypeValue == 0) {  //自定义查询时间
        this.startTime = this.filters.startTime;
        this.endTime = this.filters.endTime;
      } else if (this.filters.timeTypeValue == 1) {  //按月查询
        this.startTime = this.filters.month;
        this.endTime = '';
      } else if (this.filters.timeTypeValue == 2) {  //按年查询
        this.startTime = this.filters.year;
        this.endTime = '';
      }
      API_GradeSubentry(
        this.collectorID,
        this.startTime,
        this.endTime,
        this.filters.timeTypeValue
      )
        .then(response => {
          this.tableData = response.data; // 手动更新列表值
        })
        .catch(error => {
          console.log(error);
        });
    },
    toFixed(row, column, cellValue, index) {
      return Math.round(cellValue*Math.pow(10,4))/Math.pow(10,4);
    },
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
          sums[index] = data.property;
          return;
        }
        if (index === 1) {
          sums[index] = '总计';
          return;
        }
        const values = data.map(item => {
         return Number(item[column.property]);
        });
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Math.round(Number(curr)*100)/100;
            if (!isNaN(value)) {
              return Math.round((prev + curr)*100)/100;
            } else {
              return Math.round(prev*100)/100;
            }
          }, 0);
          // sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });
      return sums;
    },
    init() {
      API_GetCollectors(this.$store.getters.token)
        .then(response => {
          this.opt1 = response.data; // 下拉菜单数据
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  mounted: function() {
    this.init();
    this.onSubmit();
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
