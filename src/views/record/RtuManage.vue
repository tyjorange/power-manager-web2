<!-- 终端维护 -->
<template>
    <section style="padding: 10px;">
        <el-col :span="24" style="margin-bottom:20px;">
            <template>
                <el-select v-model="value" placeholder="请选择" style="float:left;">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </template>
            <el-input v-model="terminal" placeholder="请输入终端名称/地址" class="input"></el-input>
            <div style="float:right;">
                <el-button type="primary" size="small">新增</el-button>
                <el-button type="primary" size="small">修改</el-button>
                <el-button type="primary" size="small">删除</el-button>
                <el-button type="primary" size="small">查询</el-button>
                <el-button type="primary" size="small">导出</el-button>
            </div>
        </el-col>

        <el-table :data="tableData" border highlight-current-row stripe style="width: 100%;">
            <el-table-column label="终端名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.collectorName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="设备地址" width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.code }}</span>
                </template>
            </el-table-column>
            <el-table-column label="规约类型" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.statute }}</span>
                </template>
            </el-table-column>
            <el-table-column label="通道名称" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.channel }}</span>
                </template>
            </el-table-column>
            <el-table-column label="计量点个数" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.switchNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column label="终端状态" width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.active }}</span>
                </template>
            </el-table-column>
            <el-table-column label="最后在线时间" width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.activeTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="終端IP" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ip }}</span>
                </template>
            </el-table-column>
            <el-table-column label="安装地址" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.address }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80" style="text-align: center;">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="终端指令" :visible.sync="dialogFormVisible" height='600px'>
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="计量点通信参数" name="first"></el-tab-pane>
                <el-tab-pane label="终端复位" name="second"></el-tab-pane>
                <el-tab-pane label="拉合闸" name="third"></el-tab-pane>
                <el-tab-pane label="终端事件配置" name="fourth"></el-tab-pane>
                <el-tab-pane label="数据召读" name="fifth"></el-tab-pane>
            </el-tabs>
        </el-dialog>
    </section>
</template>


<script>
  export default {
    data() {
      return {
        options: [{
          value: '-1',
          label: '终端状态'
        }, {
          value: '0',
          label: '离线'
        }, {
          value: '1',
          label: '在线'
        }],
        value: '-1',
        terminal: '',
        tableData: [{
          collectorName: '智能办公室终端',
          code: '201812120072',
          statute: '国网09',
          channel:'TCP Server',
          switchNumber:'5',
          active:'在线',
          activeTime:'2019-01-11 15:39:56',
          ip:'192.168.170.95',
          address:''
        }, {
          collectorName: '索罗思腾内网测试',
          code: '201811061111',
          statute: '国网09',
          channel:'TCP Server',
          switchNumber:'12',
          active:'在线',
          activeTime:'2019-01-08 12:12:45',
          ip:'192.168.1.82',
          address:''
        }],
        dialogFormVisible: false,
        activeName2: 'first'
      }
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style>
.input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 300px; 
    margin-left: 20px;
}
.el-dialog__body {
    padding: 10px 20px;
    color: #606266;
    font-size: 14px;
}
 .el-button+.el-button {
    margin-left: 0px;
}
</style>
