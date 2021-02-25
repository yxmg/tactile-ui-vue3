/**
 *Created by 夜雪暮歌 on 2021/2/25
 **/
// @ts-nocheck
import fs from 'fs'
import {baseParse} from '@vue/compiler-core'

export default {
  'demo-sign'(options) {
    const { path } = options
    const file = fs.readFileSync(path).toString()
    const parsed = baseParse(file).children.find(n => n.tag === 'demo-sign')
    const title = parsed.children[0].content
    const main = file.split(parsed.loc.source).join('').trim()
    return `export default function (Component) {
      Component.__sourceCode = ${JSON.stringify(main)}
      Component.__sourceCodeTitle = ${JSON.stringify(title)}
    }`.trim()
  }
}