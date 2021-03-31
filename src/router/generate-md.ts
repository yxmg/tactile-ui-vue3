/**
 *Created by 夜雪暮歌 on 2021/2/25
 **/
import {h} from 'vue'
import Markdown from '../components/markdown.vue'

export const generateMd = (content: string) => {
  return h(Markdown, { content, key: content })
}