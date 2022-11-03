import request from '@/utils/request'

const api_path = '/admin/hosp/hospitalSet'
export default {
  findAll() {
    return request({
      url: `${api_path}/findAll`,
      method: 'get'
    })
  },
  findById(id) {
    return request({
      url: `${api_path}/getHospSet/${id}`,
      method: 'get'
    })
  }
}
