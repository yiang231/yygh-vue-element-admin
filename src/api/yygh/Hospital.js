import request from '@/utils/request'

const hosp_path = '/admin/hosp/hospital'
export default {
  pageList(page, limit, searchObj) {
    return request({
      url: `${hosp_path}/${page}/${limit}`,
      method: 'post',
      data: searchObj
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
