import request from '@/utils/request'

const hosp_path = '/admin/hosp/hospital'
export default {
  pageList(page, limit, searchObj) {
    return request({
      url: `${hosp_path}/${page}/${limit}`,
      method: 'post', // method: 'get' 后端使用FGetMapping且不加RequestBody参数注解
      data: searchObj // params: searchObj
    })
  },
  updateStatus(id, status) {
    return request({
      url: `${hosp_path}/updateStatus/${id}/${status}`,
      method: 'get'
    })
  },
  getHospById(id) {
    return request({
      url: `${hosp_path}/show/${id}`,
      method: 'get'
    })
  }
}
