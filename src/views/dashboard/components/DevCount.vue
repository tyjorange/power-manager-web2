<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="12">
        <el-card class="box-card2" shadow="never" :body-style="{ padding: '10px' }">
          <div slot="header" class="clearfix">
            <span>终端在线数(个)</span>
          </div>
          <div class="text item">
            1
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card2" shadow="never" :body-style="{ padding: '10px' }">
          <div slot="header" class="clearfix">
            <span>终端数量(个)</span>
          </div>
          <div class="text item">
            6
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="12">
        <el-card class="box-card2" shadow="never" :body-style="{ padding: '10px' }">
          <div slot="header" class="clearfix">
            <span>未实时上报数(个)</span>
          </div>
          <div class="text item">
            14
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card2" shadow="never" :body-style="{ padding: '10px' }">
          <div slot="header" class="clearfix">
            <span>计量点数量(个)</span>
          </div>
          <div class="text item">
            19
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box-card2 {
  margin-top: 10px;
}
</style>

