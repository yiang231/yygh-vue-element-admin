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
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_path}/${page}/${limit}`,
      method: 'post',
      // 传递json
      data: searchObj
    })
  },
  removeById(id) {
    return request({
      url: `${api_path}/${id}`,
      method: 'delete'
    })
  },
  save(hospitalSet) {
    return request({
      url: `${api_path}/save`,
      method: 'post',
      data: hospitalSet
    })
  },
  updateById(hospset) { // 形参or实参
    return request({
      url: `${api_path}/updateHospSet`,
      method: 'post',
      data: hospset
    })
  },
  batchRemove(ids) {
    return request({
      url: `${api_path}/batchRemove`,
      method: 'delete',
      data: ids
    })
  },
  lockHospSet(id, status) {
    return request({
      url: `${api_path}/lockHospitalSet/${id}/${status}`,
      method: 'put'
    })
  }
}
