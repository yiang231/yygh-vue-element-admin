import request from '@/utils/request'

const api_path = '/admin/user'

export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_path}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  lock(id, status) {
    return request({
      url: `${api_path}/lock/${id}/${status}`,
      method: 'get'
    })
  },
  show(id) {
    return request({
      url: `${api_path}/show/${id}`,
      method: 'get'
    })
  }
}
