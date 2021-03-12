/**
 *Created by 夜雪暮歌 on 2021/2/22
 **/
import Dialog from './dialog.vue'
import {createApp, h} from "vue";

export const openDialog = (options) => {
  const { title, content, ok, cancel, maskClosable } = options
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp({
    render() {
      return h(Dialog,
        {
          visible: true,
          'onUpdate:visible': (newVisible) => {
            if (!newVisible) {
              app.unmount(div)
              div.remove()
            }
          },
          ...options
        },
        {
          default: () => options.content,
          title: () => options.title
        })
    }
  })
  app.mount(div)
}