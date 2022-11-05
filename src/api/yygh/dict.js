import request from '@/utils/request'

const dict_path = '/admin/cmn/dict'
export default {
  dictList(id) {
    return request({
      url: `${dict_path}/findChildData/${id}`,
      method: 'get'
    })
  }
}
