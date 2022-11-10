import request from '@/utils/request'

const dict_path = '/admin/cmn/dict'
export default {
  dictList(id) {
    return request({
      url: `${dict_path}/findChildData/${id}`,
      method: 'get'
    })
  },
  importData() {
    return request({
      url: `${dict_path}/importData`,
      method: 'post'
    })
  },
  findByDictCode(dictCode) {
    return request({
      url: `${dict_path}/findByDictCode/${dictCode}`,
      method: 'get'
    })
  }
}
