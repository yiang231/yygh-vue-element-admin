<!-- 控件  ，表格，表单，按钮。。。 -->
<template>
  <!-- :data  遍历的集合（vue中的data中定义的） -->
  <!-- prop：集合中每一个对象中的属性 -->
  <!-- label：表头 -->
  <div class="app-container">
    <el-table :data="list" border stripe style="width: 100%">
      <el-table-column label="医院编号" prop="hoscode" width="180" />
      <el-table-column label="医院名称" prop="hosname" width="180" />
      <el-table-column label="医院端接口路径" prop="apiUrl" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="签名key" prop="signKey" />
      <el-table-column label="联系人" prop="contactsName" />
      <el-table-column label="状态" prop="status" />
    </el-table>
  </div>

</template>
<script>

import hospsetApi from '@/api/yygh/hospset'

// vue实例
// vue脚本（js）
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    console.log('钩子方法执行')
    this.fetchData()
  },
  methods: {
    fetchData() {
      hospsetApi.findAll().then(resp => {
        // resp = result
        this.list = resp.data.list
      })
    }
  }
}
</script>
