<template>
  <div class="app-container">
    <!-- 1、查询条件的文本框 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="医院名称">
        <el-input v-model="searchObj.hosname" placeholder="" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="searchObj.hoscode" placeholder="" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData()">查询</el-button>
        <el-button type="warning" @click="resetData()">清空</el-button>
        <el-button type="danger" @click="batchRemove()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--2、分页列表-->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      element-loading-text="数据加载中"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!--复选框-->
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" width="50">
        <!--获取索引号，从0开始，无论哪一页-->
        <template slot-scope="scope">
          {{ scope.$index + (page - 1) * limit }}
        </template>
      </el-table-column>
      <el-table-column label="医院编号" prop="hoscode" width="180" />
      <el-table-column label="医院名称" prop="hosname" width="180" />
      <el-table-column label="医院端接口路径" prop="apiUrl" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="签名key" prop="signKey" />
      <el-table-column label="联系人" prop="contactsName" />
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <!-- scope.row 当前行数据对象 {xxx} -->
          {{ scope.row.status === 0 ? '锁定' : '正常' }}
        </template>
      </el-table-column>
      <!--3、修改和删除按钮-->
      <!--添加锁定按钮-->
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <!--点击修改按钮触发编辑医院设置路由-->
          <router-link :to="'/yygh/hospset/edit/'+scope.row.id">
            <el-button circle icon="el-icon-edit" type="primary" />
          </router-link>
          <el-button circle icon="el-icon-delete" type="danger" @click="removeDataById(scope.row.id)" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="锁定操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 1"
            circle
            icon="el-icon-lock"
            type="danger"
            @click="lock(scope.row.id,0)"
          />
          <el-button
            v-if="scope.row.status === 0"
            circle
            icon="el-icon-unlock"
            type="success"
            @click="lock(scope.row.id,1)"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--4、分页控件-->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :page-sizes="[5, 10, 15, 20]"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import hospsetApi from '@/api/yygh/HospSet'

export default {
  data() {
    return {
      listLoading: true, // 加载动画
      list: [], // 数据列表
      page: 1, // 查询第几页
      limit: 5, // 每页的条数
      searchObj: {}, // 查询条件
      total: 0, // 总记录数，分页控件使用
      multipleSelection: [] // 记录被选中的行的数据
    }
  }, created() {
    this.fetchData()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    batchRemove() {
      // 添加确认提示框
      const ids = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        // 拿到被选中行的id的数值赋予ids进行批量删除
        ids.push(this.multipleSelection[i].id)
      }
      // 确认弹出框
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除的方法
        hospsetApi.batchRemove(ids).then(resp => {
          if (resp.code === 20000) {
            this.$message.success(resp.message)
            this.fetchData()
          } else {
            this.$message.error(resp.message)
          }
        }).catch(resp => {
          // 发生异常时
          this.$message.error('出现异常')
        }).catch(() => {
          // 取消
          this.$message.info('已取消删除')
        })
      })
    },
    removeDataById(id) {
      // 确认弹出框
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除的方法
        hospsetApi.removeById(id).then(resp => {
          if (resp.code === 20000) {
            this.$message.success('删除成功')
            this.fetchData()
          } else {
            this.$message.error('删除失败')
          }
        }).catch(resp => {
          // 发生异常时
          this.$message.error('出现异常')
        })
      }).catch(() => {
        // 取消
        this.$message.info('已取消删除')
      })
    },
    resetData() {
      // this.searchObj = { hosname: '', hoscode: '' }
      this.searchObj = {}
      this.fetchData()
    },
    // fetchData(page)调用时必须传参
    // fetchData(page = 1)不需要传参，等价于 fetchData(1)
    fetchData(page = 1) {
      this.page = page // 传值就按照传的来，不传值就为1
      hospsetApi.getPageList(this.page, this.limit, this.searchObj).then(resp => {
        if (resp.success === true) {
          this.total = resp.data.total
          this.list = resp.data.rows
        } else {
          this.$message.error('数据加载失败')
        }
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      // 每页显示多少条就发生改变
      this.limit = val
      // 根据新的分页参数，重新查询数据
      this.fetchData()
    },
    handleCurrentChange(val) {
      // 根据新的分页数据，重新查询
      this.fetchData(val)
    },
    lock(id, status) {
      hospsetApi.lockHospSet(id, status).then(resp => {
        const msg = status === 0 ? '锁定成功' : '解锁成功'
        if (resp.code === 20000) {
          this.$message.success(msg)
          this.fetchData(this.page) // 重新加载当前页
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
