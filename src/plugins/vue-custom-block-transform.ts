/**
 *Created by 夜雪暮歌 on 2021/2/25
 **/
// @ts-nocheck
import fs from 'fs'
import {parse} from '@vue/compiler-sfc'

export default {
  name: 'demo-sign',
  transform(code, id) {
    if (!/vue&type=demo-sign/.test(id)) {
      return
    }
    const path = id.split('?')[0]
    const file = fs.readFileSync(path).toString()
    const parsed = parse(file).descriptor
    const main = parsed.source.replace(/<demo-sign>.*<\/demo-sign>/, '').trim()
    return `export default function (Component) {
      Component.__sourceCode = ${JSON.stringify(main)}
      Component.__sourceCodeTitle = ${JSON.stringify(code)}
    }`.trim()
  }
}