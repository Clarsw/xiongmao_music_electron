// 全局组件
// import { Pagination } from 'element-ui'
// import Vue from 'vue'
import Icon from '@/components/commons/Icon'
import SheetItem from '@/components/commons/SheetItem'
import AlbumItem from '@/components/commons/AlbumItem'

const globalVue = {
  install(Vue) {
    Vue.component('Icon', Icon)
    Vue.component('SheetItem', SheetItem)
    Vue.component('AlbumItem', AlbumItem)
    Vue.component('SheetItem', SheetItem)
  }
}
export default globalVue