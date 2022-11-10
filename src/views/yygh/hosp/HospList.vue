<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="searchObj.provinceCode" placeholder="请选择省份" @change="provinceChange">
          <el-option
            v-for="province in provinceList"
            :key="province.id"
            :label="province.name"
            :value="province.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.cityCode" placeholder="请选择城市">
          <el-option
            v-for="city in cityList"
            :key="city.id"
            :label="city.name"
            :value="city.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (page - 1) * limit }}
        </template>
      </el-table-column>
      <el-table-column label="医院logo" width="120">
        <template slot-scope="scope">
          <img :src="'data:image/jpeg;base64,'+scope.row.logoData" alt="logo" width="80">
        </template>
      </el-table-column>
      <el-table-column label="医院名称" prop="hosname" width="120" />
      <el-table-column label="等级" prop="param.hosTypeString" width="90" />
      <el-table-column label="详细地址" prop="param.fullAddress" />
      <el-table-column label="状态" prop="status" width="120">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '已上线' : '已下线' }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="'/yygh/hosp/Show/'+scope.row.id">
            <el-button type="primary">查看</el-button>
          </router-link>
          <el-button type="primary">排班</el-button>
          <el-button v-if="scope.row.status===1" type="primary" @click="updateStatus(scope.row.id,0)">下线</el-button>
          <el-button v-if="scope.row.status===0" type="primary" @click="updateStatus(scope.row.id,1)">上线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :page-sizes="[5, 10, 15, 20]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      style="padding: 30px 0; text-align: center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import hospitalApi from '@/api/yygh/Hospital'
import dictApi from '@/api/yygh/Dict'

export default {
  data() {
    return {
      list: [{}],
      page: 1,
      limit: 5,
      total: 0,
      searchObj: { provinceCode: '', cityCode: '', hosname: '' },
      provinceList: [], // 所有的省份
      cityList: []// 城市列表
    }
  },
  created() {
    // 1、查询第一页的医院列表
    this.fetchData()
    // 2、查询所有的省份
    this.findByDictCode('Province')
  },
  methods: {
    findByDictCode(dictCode) {
      dictApi.findByDictCode(dictCode).then(resp => {
        this.provinceList = resp.data.list
      })
    },
    updateStatus(id, status) {
      // 确认弹出框
      this.$confirm('此操作将改变医院状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 更新状态
        hospitalApi.updateStatus(id, status)
        this.fetchData(this.page)
      }).catch(() => {
        // 取消
        this.$message.info('已取消操作')
      })
    },
    provinceChange() {
      this.cityList = []// 省份发生改变，城市列表清空
      this.searchObj.cityCode = ''

      // 根据省份id查询城市列表
      dictApi.dictList(this.searchObj.provinceCode).then(resp => {
        this.cityList = resp.data.list // 城市集合（第二个下拉框）
      })
    },
    // 每页显示多少条发生改变时
    handleSizeChange(val) {
      // 参数：最新每页显示多少条
      this.limit = val
      this.fetchData(1)
    },
    // 当前要查询第几页发生改变时
    handleCurrentChange(val) {
      // 参数：最新要查询第几页
      this.fetchData(val)
    },
    fetchData(page = 1) {
      this.page = page
      hospitalApi.pageList(this.page, this.limit, this.searchObj).then(resp => {
        this.list = resp.data.pages.content
        this.total = resp.data.pages.totalElements
      })
    }
  }
}
</script>
