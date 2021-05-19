function deleteEmptyProperty(object) {
  for (const i in object) {
    var value = object[i]
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          delete object[i]
          continue
        }
      }
      this.deleteEmptyProperty(value)
      if (this.isEmpty(value)) {
        delete object[i]
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i]
      } else {
      }
    }
  }
}
export default {
  // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
  install: function(Vue) {
    Vue.prototype.global_delete = (param) => deleteEmptyProperty(param)
  }
}

