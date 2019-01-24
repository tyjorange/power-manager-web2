import request from '@/utils/request'

export function getList() {
  var param_1 = "";
  var param_2 = "";
  var startTime = "";
  var startTime = "";
  return request({
    url: '/get/point_used',
    method: 'get',
    params: {
      param_1,
      param_2,
      startTime,
      endTime,
    }
  })
}
