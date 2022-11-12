<template>
  <div class="app-container">
    <!--开通医院设置表单-->
    <el-form label-width="100px">
      <el-form-item label="医院名称">
        <el-input v-model="hospset.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospset.hoscode" disabled />
      </el-form-item>
      <el-form-item label="apiUrl">
        <el-input v-model="hospset.apiUrl" />
      </el-form-item>
      <el-form-item label="签名秘钥">
        <el-input v-model="hospset.signKey" />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospset.contactsName" />
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospset.contactsPhone" />
      </el-form-item>
      <!--控件按钮-->
      <el-form-item>
        <!--:disabled="saveBtnDisable"  前面带冒号：：：：：：：： true可以防止重复提交表单-->
        <el-button :disabled="saveBtnDisable" type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<!--添加删除状态-->
<script>
import hospsetApi from '@/api/yygh/HospSet'

export default {
  data() {
    return {
      saveBtnDisable: false, // 默認false是可點擊狀態
      hospset: {} // 医院设置对象
    }
  },
  created() {
    // this.$route.params // 所有参数
    if (this.$route.params && this.$route.params.id) { // 有路由参数且有id参数
      // 点击修改按钮打开的修改页面
      hospsetApi.findById(this.$route.params.id).then(resp => {
        this.hospset = resp.data.item // 后端定义的参数名
      })
    } else {
      // 点击开通医院设置打开的修改页面
    }
  },
  methods: {
    cancel() {
      this.$router.push({ path: '/yygh/hospset/pageList' })
    },
    saveOrUpdate() {
      this.saveBtnDisable = true // 防止表单重复提交请求
      // 通过有没有id判断调用哪个方法
      if (this.hospset.id) { // 通过添加入口进行修改，是否有数据回显
        // 修改还是新增判断
        this.update()
      } else {
        this.save()
      }
    },
    // 开通医院设置
    save() {
      hospsetApi.save(this.hospset).then(resp => {
        if (resp.code === 20000) {
          // 开通成功
          this.$message.success(resp.message)
          // 通过路由跳转到查询页面,不带参数
          this.$router.push({ path: '/yygh/hospset/pageList' })
        } else {
          // 开通失败
          this.$message.error(resp.message)
          // false表示可以继续保存
          this.saveBtnDisable = false
        }
      })
    },
    update() {
      // 更新医院设置
      hospsetApi.updateById(this.hospset).then(resp => {
        if (resp.code === 20000) {
          this.$message.success(resp.message)
          // 通过路由跳转到查询页面,不带参数
          this.$router.push({ path: '/yygh/hospset/pageList' })
        } else {
          // 更新失败
          this.$message.error(resp.message)
          // false表示可以继续保存
          this.saveBtnDisable = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
