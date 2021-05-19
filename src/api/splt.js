import request from '@/utils/request'

// 获取视频聊天新
export function getSpltInfo() {
  return request({
    url: '/system/spth/getInfo',
    method: 'post'
  })
}
